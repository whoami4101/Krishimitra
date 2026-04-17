import {
  sensorData,
  historicalData,
  aiInsights,
  weatherForecast,
  pestAlerts,
  cropTypes,
  languages,
} from '../../src/data/mockData';

describe('mockData', () => {
  describe('sensorData', () => {
    it('has all required sensor fields', () => {
      expect(sensorData).toHaveProperty('soilMoisture');
      expect(sensorData).toHaveProperty('temperature');
      expect(sensorData).toHaveProperty('humidity');
      expect(sensorData).toHaveProperty('lightIntensity');
      expect(sensorData).toHaveProperty('nitrogen');
      expect(sensorData).toHaveProperty('phosphorus');
      expect(sensorData).toHaveProperty('potassium');
      expect(sensorData).toHaveProperty('phLevel');
      expect(sensorData).toHaveProperty('lastUpdated');
    });

    it('has numeric values within realistic ranges', () => {
      expect(sensorData.soilMoisture).toBeGreaterThanOrEqual(0);
      expect(sensorData.soilMoisture).toBeLessThanOrEqual(100);
      expect(sensorData.temperature).toBeGreaterThan(-20);
      expect(sensorData.temperature).toBeLessThan(60);
      expect(sensorData.humidity).toBeGreaterThanOrEqual(0);
      expect(sensorData.humidity).toBeLessThanOrEqual(100);
      expect(sensorData.phLevel).toBeGreaterThan(0);
      expect(sensorData.phLevel).toBeLessThanOrEqual(14);
    });

    it('lastUpdated is a valid ISO date string', () => {
      expect(() => new Date(sensorData.lastUpdated)).not.toThrow();
      expect(new Date(sensorData.lastUpdated).toISOString()).toBe(sensorData.lastUpdated);
    });
  });

  describe('historicalData', () => {
    const WEEK_LENGTH = 7;

    it('has all required historical arrays', () => {
      const fields = ['soilMoisture', 'temperature', 'humidity', 'lightIntensity', 'nitrogen', 'phosphorus', 'potassium', 'phLevel'];
      fields.forEach(field => {
        expect(historicalData).toHaveProperty(field);
        expect(Array.isArray(historicalData[field])).toBe(true);
      });
    });

    it('each array has 7 entries matching labels length', () => {
      expect(historicalData.labels).toHaveLength(WEEK_LENGTH);
      const fields = ['soilMoisture', 'temperature', 'humidity', 'lightIntensity', 'nitrogen', 'phosphorus', 'potassium', 'phLevel'];
      fields.forEach(field => {
        expect(historicalData[field]).toHaveLength(WEEK_LENGTH);
      });
    });

    it('labels are the days of the week', () => {
      expect(historicalData.labels).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    });

    it('phLevel values are within valid range', () => {
      historicalData.phLevel.forEach(val => {
        expect(val).toBeGreaterThan(0);
        expect(val).toBeLessThanOrEqual(14);
      });
    });
  });

  describe('aiInsights', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(aiInsights)).toBe(true);
      expect(aiInsights.length).toBeGreaterThan(0);
    });

    it('each insight has required fields', () => {
      aiInsights.forEach(insight => {
        expect(insight).toHaveProperty('id');
        expect(insight).toHaveProperty('status');
        expect(insight).toHaveProperty('title');
        expect(insight).toHaveProperty('message');
        expect(insight).toHaveProperty('recommendation');
        expect(insight).toHaveProperty('icon');
        expect(insight).toHaveProperty('color');
      });
    });

    it('status values are known types', () => {
      const validStatuses = ['good', 'warning', 'danger', 'info'];
      aiInsights.forEach(insight => {
        expect(validStatuses).toContain(insight.status);
      });
    });

    it('ids are unique', () => {
      const ids = aiInsights.map(i => i.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('weatherForecast', () => {
    it('has 5 days of forecast', () => {
      expect(weatherForecast).toHaveLength(5);
    });

    it('each forecast entry has required fields', () => {
      weatherForecast.forEach(entry => {
        expect(entry).toHaveProperty('day');
        expect(entry).toHaveProperty('temp');
        expect(entry).toHaveProperty('humidity');
        expect(entry).toHaveProperty('rain');
        expect(entry).toHaveProperty('icon');
      });
    });
  });

  describe('pestAlerts', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(pestAlerts)).toBe(true);
      expect(pestAlerts.length).toBeGreaterThan(0);
    });

    it('each alert has required fields', () => {
      pestAlerts.forEach(alert => {
        expect(alert).toHaveProperty('id');
        expect(alert).toHaveProperty('pest');
        expect(alert).toHaveProperty('riskLevel');
        expect(alert).toHaveProperty('color');
        expect(alert).toHaveProperty('prevention');
      });
    });

    it('risk levels are known values', () => {
      const validLevels = ['Low', 'Medium', 'High'];
      pestAlerts.forEach(alert => {
        expect(validLevels).toContain(alert.riskLevel);
      });
    });
  });

  describe('cropTypes', () => {
    it('is a non-empty array of strings', () => {
      expect(Array.isArray(cropTypes)).toBe(true);
      expect(cropTypes.length).toBeGreaterThan(0);
      cropTypes.forEach(crop => expect(typeof crop).toBe('string'));
    });

    it('contains common crops', () => {
      expect(cropTypes).toContain('Wheat');
      expect(cropTypes).toContain('Rice');
    });
  });

  describe('languages', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
    });

    it('each language has code and name', () => {
      languages.forEach(lang => {
        expect(lang).toHaveProperty('code');
        expect(lang).toHaveProperty('name');
        expect(typeof lang.code).toBe('string');
        expect(typeof lang.name).toBe('string');
      });
    });

    it('includes English', () => {
      const english = languages.find(l => l.code === 'en');
      expect(english).toBeDefined();
      expect(english.name).toBe('English');
    });
  });
});
