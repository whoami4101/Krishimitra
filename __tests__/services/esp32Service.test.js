import { fetchESP32Data, checkESP32Connection } from '../../src/services/esp32Service';

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const makeOkResponse = (data) => ({
  ok: true,
  json: jest.fn().mockResolvedValue(data),
});

const makeErrorResponse = () => ({
  ok: false,
  json: jest.fn().mockResolvedValue({ error: 'bad request' }),
});

describe('esp32Service', () => {
  describe('fetchESP32Data', () => {
    it('maps temperature and humidity from primary field names', async () => {
      mockFetch.mockResolvedValue(makeOkResponse({
        temperature: 30,
        humidity: 70,
        soilMoisture: 45,
      }));

      const result = await fetchESP32Data();

      expect(result.temperature).toBe(30);
      expect(result.humidity).toBe(70);
      expect(result.soilMoisture).toBe(45);
      expect(result.connected).toBe(true);
    });

    it('maps temperature and humidity from alternate field names', async () => {
      mockFetch.mockResolvedValue(makeOkResponse({
        temp: 25,
        hum: 60,
        moisture: 50,
      }));

      const result = await fetchESP32Data();

      expect(result.temperature).toBe(25);
      expect(result.humidity).toBe(60);
      expect(result.soilMoisture).toBe(50);
      expect(result.connected).toBe(true);
    });

    it('includes default 0 values for unavailable sensors', async () => {
      mockFetch.mockResolvedValue(makeOkResponse({
        temperature: 28,
        humidity: 65,
        soilMoisture: 40,
      }));

      const result = await fetchESP32Data();

      expect(result.lightIntensity).toBe(0);
      expect(result.phLevel).toBe(0);
      expect(result.nitrogen).toBe(0);
      expect(result.phosphorus).toBe(0);
      expect(result.potassium).toBe(0);
    });

    it('returns disconnected state when endpoint is unreachable', async () => {
      mockFetch.mockRejectedValue(new Error('ECONNREFUSED'));

      const promise = fetchESP32Data();
      jest.runAllTimersAsync();

      const result = await promise;

      expect(result.connected).toBe(false);
      expect(result.temperature).toBe(0);
      expect(result.humidity).toBe(0);
      expect(result.soilMoisture).toBe(0);
    });

    it('returns disconnected state when response is not ok', async () => {
      mockFetch.mockResolvedValue(makeErrorResponse());

      const promise = fetchESP32Data();
      jest.runAllTimersAsync();

      const result = await promise;

      expect(result.connected).toBe(false);
    });

    it('returns all required sensor keys in disconnected state', async () => {
      mockFetch.mockRejectedValue(new Error('timeout'));

      const promise = fetchESP32Data();
      jest.runAllTimersAsync();

      const result = await promise;

      const requiredKeys = ['temperature', 'humidity', 'soilMoisture', 'lightIntensity', 'phLevel', 'nitrogen', 'phosphorus', 'potassium', 'connected'];
      requiredKeys.forEach(key => expect(result).toHaveProperty(key));
    });
  });

  describe('checkESP32Connection', () => {
    it('returns true when response is ok', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const result = await checkESP32Connection();

      expect(result).toBe(true);
    });

    it('returns false when response is not ok', async () => {
      mockFetch.mockResolvedValue({ ok: false });

      const result = await checkESP32Connection();

      expect(result).toBe(false);
    });

    it('returns false when fetch throws', async () => {
      mockFetch.mockRejectedValue(new Error('connection refused'));

      const promise = checkESP32Connection();
      jest.runAllTimersAsync();

      const result = await promise;

      expect(result).toBe(false);
    });
  });
});
