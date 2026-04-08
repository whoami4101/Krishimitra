import axios from 'axios';
import { weatherService } from '../../src/services/weatherService';

jest.mock('axios');

const mockCurrentWeatherResponse = {
  data: {
    main: { temp: 28.5, humidity: 65 },
    wind: { speed: 3.2 },
    weather: [{ description: 'clear sky', icon: '01d' }],
  },
};

const makeForecastItem = (temp, humidity, wind, date) => ({
  dt: Math.floor(date.getTime() / 1000),
  main: { temp, humidity },
  wind: { speed: wind },
  weather: [{ description: 'light rain', icon: '10d' }],
});

const today = new Date('2024-01-15T12:00:00Z');
const tomorrow = new Date('2024-01-16T12:00:00Z');

const mockForecastResponse = {
  data: {
    list: [
      makeForecastItem(26, 70, 4.1, today),
      makeForecastItem(28, 68, 3.8, today),
      makeForecastItem(22, 75, 5.0, tomorrow),
      makeForecastItem(24, 72, 4.5, tomorrow),
    ],
  },
};

describe('weatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('returns formatted weather data on success', async () => {
      axios.get.mockResolvedValueOnce(mockCurrentWeatherResponse);

      const result = await weatherService.getCurrentWeather(28.6139, 77.209);

      expect(result).toEqual({
        temp: 28.5,
        humidity: 65,
        windSpeed: 3.2,
        description: 'clear sky',
        icon: '01d',
      });
    });

    it('calls the correct URL with lat, lon and metric units', async () => {
      axios.get.mockResolvedValueOnce(mockCurrentWeatherResponse);

      await weatherService.getCurrentWeather(28.6139, 77.209);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/weather'),
        expect.objectContaining({
          params: expect.objectContaining({ lat: 28.6139, lon: 77.209, units: 'metric' }),
        })
      );
    });

    it('throws on network error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(weatherService.getCurrentWeather(0, 0)).rejects.toThrow('Network error');
    });
  });

  describe('getForecast', () => {
    it('returns an array of at most 5 daily forecasts', async () => {
      axios.get.mockResolvedValueOnce(mockForecastResponse);

      const result = await weatherService.getForecast(28.6139, 77.209);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('each forecast entry has required fields', async () => {
      axios.get.mockResolvedValueOnce(mockForecastResponse);

      const result = await weatherService.getForecast(28.6139, 77.209);

      result.forEach(entry => {
        expect(entry).toHaveProperty('date');
        expect(entry).toHaveProperty('temp');
        expect(entry).toHaveProperty('tempMin');
        expect(entry).toHaveProperty('tempMax');
        expect(entry).toHaveProperty('humidity');
        expect(entry).toHaveProperty('windSpeed');
        expect(entry).toHaveProperty('rainfall');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('icon');
      });
    });

    it('averages temperatures correctly', async () => {
      axios.get.mockResolvedValueOnce(mockForecastResponse);

      const result = await weatherService.getForecast(28.6139, 77.209);

      // Today: temps [26, 28] -> avg = 27
      const todayEntry = result.find(e => e.date === today.toLocaleDateString());
      expect(todayEntry.temp).toBe(27);
      expect(todayEntry.tempMin).toBe(26);
      expect(todayEntry.tempMax).toBe(28);
    });

    it('accumulates rain from items with rain data', async () => {
      const responseWithRain = {
        data: {
          list: [
            { ...makeForecastItem(25, 80, 4, today), rain: { '3h': 2.5 } },
            { ...makeForecastItem(26, 78, 3.5, today), rain: { '3h': 1.0 } },
          ],
        },
      };
      axios.get.mockResolvedValueOnce(responseWithRain);

      const result = await weatherService.getForecast(28.6139, 77.209);

      const todayEntry = result[0];
      expect(parseFloat(todayEntry.rainfall)).toBeCloseTo(3.5);
    });

    it('throws on network error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network error'));

      await expect(weatherService.getForecast(0, 0)).rejects.toThrow('Network error');
    });
  });
});
