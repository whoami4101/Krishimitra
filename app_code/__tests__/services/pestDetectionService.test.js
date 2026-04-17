import { analyzePestDisease } from '../../src/services/pestDetectionService';

jest.useFakeTimers();

describe('pestDetectionService', () => {
  describe('analyzePestDisease', () => {
    it('returns a result for a given image URI', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result).toBeDefined();
    });

    it('result has a name property', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result).toHaveProperty('name');
      expect(typeof result.name).toBe('string');
    });

    it('result has a confidence value between 75 and 94', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result.confidence).toBeGreaterThanOrEqual(75);
      expect(result.confidence).toBeLessThanOrEqual(94);
    });

    it('result has a detected boolean', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result).toHaveProperty('detected');
      expect(typeof result.detected).toBe('boolean');
    });

    it('result has a severity field', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result).toHaveProperty('severity');
      expect(['low', 'medium', 'high']).toContain(result.severity);
    });

    it('result has a description field', async () => {
      const promise = analyzePestDisease('file://test-image.jpg');
      jest.runAllTimers();
      const result = await promise;

      expect(result).toHaveProperty('description');
      expect(typeof result.description).toBe('string');
      expect(result.description.length).toBeGreaterThan(0);
    });

    it('returns consistent structure across multiple calls', async () => {
      const requiredKeys = ['name', 'detected', 'severity', 'description', 'confidence'];

      for (let i = 0; i < 5; i++) {
        const promise = analyzePestDisease('file://img.jpg');
        jest.runAllTimers();
        const result = await promise;
        requiredKeys.forEach(key => expect(result).toHaveProperty(key));
      }
    });
  });
});
