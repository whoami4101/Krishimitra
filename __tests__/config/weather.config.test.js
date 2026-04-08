import { WEATHER_CONFIG, getLocation } from '../../src/config/weather.config';
import * as Location from 'expo-location';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('weather.config', () => {
  describe('WEATHER_CONFIG', () => {
    it('has an API_KEY', () => {
      expect(WEATHER_CONFIG).toHaveProperty('API_KEY');
      expect(typeof WEATHER_CONFIG.API_KEY).toBe('string');
      expect(WEATHER_CONFIG.API_KEY.length).toBeGreaterThan(0);
    });

    it('has a DEFAULT_LOCATION with lat and lon', () => {
      expect(WEATHER_CONFIG.DEFAULT_LOCATION).toHaveProperty('lat');
      expect(WEATHER_CONFIG.DEFAULT_LOCATION).toHaveProperty('lon');
      expect(typeof WEATHER_CONFIG.DEFAULT_LOCATION.lat).toBe('number');
      expect(typeof WEATHER_CONFIG.DEFAULT_LOCATION.lon).toBe('number');
    });

    it('default location is within valid coordinate ranges', () => {
      const { lat, lon } = WEATHER_CONFIG.DEFAULT_LOCATION;
      expect(lat).toBeGreaterThanOrEqual(-90);
      expect(lat).toBeLessThanOrEqual(90);
      expect(lon).toBeGreaterThanOrEqual(-180);
      expect(lon).toBeLessThanOrEqual(180);
    });
  });

  describe('getLocation', () => {
    it('returns default location when permission is denied', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

      const result = await getLocation();

      expect(result.lat).toBe(WEATHER_CONFIG.DEFAULT_LOCATION.lat);
      expect(result.lon).toBe(WEATHER_CONFIG.DEFAULT_LOCATION.lon);
      expect(result.name).toBe('Delhi');
    });

    it('returns coordinates from device when permission is granted', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      Location.getCurrentPositionAsync.mockResolvedValueOnce({
        coords: { latitude: 19.076, longitude: 72.8777 },
      });

      // Mock the reverse-geocode fetch
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([{ name: 'Mumbai' }]),
      });

      const result = await getLocation();

      expect(result.lat).toBe(19.076);
      expect(result.lon).toBe(72.8777);
      expect(result.name).toBe('Mumbai');
    });

    it('falls back to "Unknown Location" when reverse geocode returns empty array', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      Location.getCurrentPositionAsync.mockResolvedValueOnce({
        coords: { latitude: 0, longitude: 0 },
      });
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce([]),
      });

      const result = await getLocation();

      expect(result.name).toBe('Unknown Location');
    });

    it('falls back to "Unknown Location" when reverse geocode fetch fails', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      Location.getCurrentPositionAsync.mockResolvedValueOnce({
        coords: { latitude: 0, longitude: 0 },
      });
      global.fetch = jest.fn().mockRejectedValueOnce(new Error('network error'));

      const result = await getLocation();

      expect(result.name).toBe('Unknown Location');
    });

    it('returns default location when getCurrentPositionAsync throws', async () => {
      Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      Location.getCurrentPositionAsync.mockRejectedValueOnce(new Error('location unavailable'));

      const result = await getLocation();

      expect(result.lat).toBe(WEATHER_CONFIG.DEFAULT_LOCATION.lat);
      expect(result.lon).toBe(WEATHER_CONFIG.DEFAULT_LOCATION.lon);
      expect(result.name).toBe('Delhi');
    });
  });
});
