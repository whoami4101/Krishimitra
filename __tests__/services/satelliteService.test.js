import { fetchSatelliteData, createPolygon, getPolygons } from '../../src/services/satelliteService';

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  jest.clearAllMocks();
});

const makeOkJson = (data) => ({
  ok: true,
  json: jest.fn().mockResolvedValue(data),
  text: jest.fn().mockResolvedValue(''),
  status: 200,
});

const makeFailResponse = (status = 401) => ({
  ok: false,
  json: jest.fn().mockResolvedValue({ error: 'unauthorized' }),
  text: jest.fn().mockResolvedValue('unauthorized'),
  status,
});

describe('satelliteService', () => {
  describe('fetchSatelliteData', () => {
    it('returns demo data when polygonId is null', async () => {
      const result = await fetchSatelliteData(null);

      expect(result).toHaveProperty('ndvi');
      expect(result).toHaveProperty('cropHealth');
      expect(result).toHaveProperty('canopyCover');
      expect(result).toHaveProperty('lastUpdated');
      expect(result.error).toContain('demo data');
    });

    it('returns demo data when polygonId is placeholder string', async () => {
      const result = await fetchSatelliteData('YOUR_POLYGON_ID');

      expect(result).toHaveProperty('ndvi');
      expect(result).toHaveProperty('cropHealth');
      expect(result.error).toContain('demo data');
    });

    it('returns demo data when NDVI API responds with error', async () => {
      mockFetch.mockResolvedValue(makeFailResponse());

      const result = await fetchSatelliteData('valid-polygon-id');

      expect(result).toHaveProperty('ndvi');
      expect(result).toHaveProperty('cropHealth');
    });

    it('returns demo data when NDVI array is empty', async () => {
      mockFetch.mockResolvedValue(makeOkJson([]));

      const result = await fetchSatelliteData('valid-polygon-id');

      expect(result.ndvi).toBe(0.68); // demo value
    });

    it('parses valid NDVI data and returns real values', async () => {
      const ndviData = [
        { dt: Math.floor(Date.now() / 1000), data: { mean: 0.72 } },
      ];
      mockFetch
        .mockResolvedValueOnce(makeOkJson(ndviData))   // NDVI endpoint
        .mockResolvedValueOnce(makeOkJson([]));          // image search endpoint

      const result = await fetchSatelliteData('valid-polygon-id');

      expect(result.ndvi).toBeCloseTo(0.72);
      expect(result.cropHealth).toBe('Excellent');
    });

    it('returns demo data when fetch throws', async () => {
      mockFetch.mockRejectedValue(new Error('network error'));

      const result = await fetchSatelliteData('any-id');

      expect(result).toHaveProperty('ndvi');
    });

    describe('getCropHealthStatus (via fetchSatelliteData)', () => {
      const testCases = [
        { ndvi: 0.65, expected: 'Excellent' },
        { ndvi: 0.45, expected: 'Good' },
        { ndvi: 0.3, expected: 'Moderate' },
        { ndvi: 0.1, expected: 'Poor' },
      ];

      testCases.forEach(({ ndvi, expected }) => {
        it(`returns "${expected}" for NDVI ${ndvi}`, async () => {
          const ndviData = [{ dt: Math.floor(Date.now() / 1000), data: { mean: ndvi } }];
          mockFetch
            .mockResolvedValueOnce(makeOkJson(ndviData))
            .mockResolvedValueOnce(makeOkJson([]));

          const result = await fetchSatelliteData('valid-polygon-id');

          expect(result.cropHealth).toBe(expected);
        });
      });
    });

    describe('calculateCanopyCover (via fetchSatelliteData)', () => {
      it('canopy cover is NDVI * 100 clamped to [0, 100]', async () => {
        const ndvi = 0.55;
        const ndviData = [{ dt: Math.floor(Date.now() / 1000), data: { mean: ndvi } }];
        mockFetch
          .mockResolvedValueOnce(makeOkJson(ndviData))
          .mockResolvedValueOnce(makeOkJson([]));

        const result = await fetchSatelliteData('valid-polygon-id');

        expect(parseFloat(result.canopyCover)).toBeCloseTo(ndvi * 100, 1);
      });
    });
  });

  describe('createPolygon', () => {
    it('returns polygon id on success', async () => {
      mockFetch.mockResolvedValueOnce(makeOkJson({ id: 'poly-abc-123' }));

      const id = await createPolygon('My Farm', 28.6139, 77.209);

      expect(id).toBe('poly-abc-123');
    });

    it('sends a POST request with correct GeoJSON structure', async () => {
      mockFetch.mockResolvedValueOnce(makeOkJson({ id: 'poly-xyz' }));

      await createPolygon('Test', 10, 20);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/polygons'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
          body: expect.stringContaining('"Polygon"'),
        })
      );
    });

    it('returns null when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('network error'));

      const id = await createPolygon('Farm', 0, 0);

      expect(id).toBeNull();
    });
  });

  describe('getPolygons', () => {
    it('returns polygon list on success', async () => {
      const polygons = [{ id: 'p1', name: 'Farm A' }, { id: 'p2', name: 'Farm B' }];
      mockFetch.mockResolvedValueOnce(makeOkJson(polygons));

      const result = await getPolygons();

      expect(result).toEqual(polygons);
    });

    it('returns empty array when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('network error'));

      const result = await getPolygons();

      expect(result).toEqual([]);
    });
  });
});
