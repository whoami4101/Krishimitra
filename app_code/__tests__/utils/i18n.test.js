import { translations, languages } from '../../src/utils/i18n';

const SUPPORTED_LANGS = ['en', 'hi', 'bn', 'mr', 'te', 'ta'];

// Collect all keys from the English (reference) translation
const EN_KEYS = Object.keys(translations.en);

describe('i18n translations', () => {
  it('exports a translations object', () => {
    expect(typeof translations).toBe('object');
    expect(translations).not.toBeNull();
  });

  it('contains all supported language codes', () => {
    SUPPORTED_LANGS.forEach(code => {
      expect(translations).toHaveProperty(code);
    });
  });

  describe('completeness – every language has all English keys', () => {
    SUPPORTED_LANGS.forEach(code => {
      it(`language "${code}" has all keys present in English`, () => {
        EN_KEYS.forEach(key => {
          expect(translations[code]).toHaveProperty(key);
        });
      });

      it(`language "${code}" values are non-empty strings`, () => {
        EN_KEYS.forEach(key => {
          const val = translations[code][key];
          expect(typeof val).toBe('string');
          expect(val.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('English baseline', () => {
    it('dashboard key returns "Dashboard"', () => {
      expect(translations.en.dashboard).toBe('Dashboard');
    });

    it('soilMoisture key returns "Soil Moisture"', () => {
      expect(translations.en.soilMoisture).toBe('Soil Moisture');
    });

    it('version key contains version number', () => {
      expect(translations.en.version).toMatch(/1\.0\.0/);
    });
  });

  describe('languages array', () => {
    it('exports a languages array', () => {
      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
    });

    it('each entry has code, name, and nativeName', () => {
      languages.forEach(lang => {
        expect(lang).toHaveProperty('code');
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('nativeName');
      });
    });

    it('language codes in the array match keys in translations', () => {
      languages.forEach(lang => {
        expect(translations).toHaveProperty(lang.code);
      });
    });
  });
});
