import React from 'react';
import { render } from '@testing-library/react-native';
import InsightCard from '../../src/components/InsightCard';

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, ...props }) => <Text {...props}>{name}</Text>,
  };
});

const baseInsight = {
  id: 1,
  status: 'good',
  title: 'Soil Moisture Level',
  message: 'Moisture is 45% - within safe range for wheat crop',
  recommendation: 'Continue current irrigation schedule',
  icon: 'water',
  color: '#4CAF50',
};

describe('InsightCard', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<InsightCard insight={baseInsight} />);
    expect(toJSON()).not.toBeNull();
  });

  it('displays the insight message', () => {
    const { getByText } = render(<InsightCard insight={baseInsight} />);
    expect(getByText('Moisture is 45% - within safe range for wheat crop')).toBeTruthy();
  });

  it('renders the icon with the insight icon name', () => {
    const { getByText } = render(<InsightCard insight={baseInsight} />);
    expect(getByText('water')).toBeTruthy();
  });

  it('applies border color from insight color', () => {
    const { toJSON } = render(<InsightCard insight={baseInsight} />);
    const json = JSON.stringify(toJSON());
    expect(json).toContain('#4CAF50');
  });

  it('renders warning insight correctly', () => {
    const warningInsight = {
      ...baseInsight,
      status: 'warning',
      message: 'Slightly below average due to recent low rainfall',
      icon: 'trending-down',
      color: '#FF9800',
    };
    const { getByText } = render(<InsightCard insight={warningInsight} />);
    expect(getByText('Slightly below average due to recent low rainfall')).toBeTruthy();
  });
});
