import React from 'react';
import { render, act } from '@testing-library/react-native';
import { LanguageProvider, useLanguage } from '../../src/context/LanguageContext';

// Helper component that exposes hook values
function LanguageConsumer({ onRender }) {
  const ctx = useLanguage();
  onRender(ctx);
  return null;
}

describe('LanguageContext', () => {
  describe('LanguageProvider', () => {
    it('renders children without crashing', () => {
      const { toJSON } = render(
        <LanguageProvider>
          <></>
        </LanguageProvider>
      );
      expect(toJSON()).toBeNull();
    });

    it('provides default language "en"', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );
      expect(ctx.language).toBe('en');
    });

    it('provides setLanguage function', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );
      expect(typeof ctx.setLanguage).toBe('function');
    });

    it('provides translation function t', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );
      expect(typeof ctx.t).toBe('function');
    });
  });

  describe('t (translation) function', () => {
    it('returns the translated value for a known key in English', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );
      expect(ctx.t('dashboard')).toBe('Dashboard');
    });

    it('returns the key itself when translation is missing', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );
      expect(ctx.t('nonExistentKey')).toBe('nonExistentKey');
    });

    it('returns Hindi translation after switching language to hi', () => {
      let ctx;
      render(
        <LanguageProvider>
          <LanguageConsumer onRender={c => { ctx = c; }} />
        </LanguageProvider>
      );

      act(() => {
        ctx.setLanguage('hi');
      });

      expect(ctx.t('dashboard')).toBe('डैशबोर्ड');
    });
  });

  describe('useLanguage hook', () => {
    it('returns undefined when used outside a provider', () => {
      // useContext returns undefined when no provider wraps the component
      let ctx;
      const Wrapper = () => {
        ctx = useLanguage();
        return null;
      };
      render(<Wrapper />);
      expect(ctx).toBeUndefined();
    });
  });
});
