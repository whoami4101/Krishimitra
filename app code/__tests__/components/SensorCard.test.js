import React from 'react';
import { render } from '@testing-library/react-native';
import SensorCard from '../../src/components/SensorCard';

jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: ({ name, ...props }) => <Text {...props}>{name}</Text>,
  };
});

describe('SensorCard', () => {
  const defaultProps = {
    title: 'Soil Moisture',
    value: '45%',
    icon: 'water',
    color: '#2196F3',
  };

  it('renders without crashing', () => {
    const { toJSON } = render(<SensorCard {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('displays the title', () => {
    const { getByText } = render(<SensorCard {...defaultProps} />);
    expect(getByText('Soil Moisture')).toBeTruthy();
  });

  it('displays the value', () => {
    const { getByText } = render(<SensorCard {...defaultProps} />);
    expect(getByText('45%')).toBeTruthy();
  });

  it('renders the icon name', () => {
    const { getByText } = render(<SensorCard {...defaultProps} />);
    expect(getByText('water')).toBeTruthy();
  });

  it('does not show "Sensor N/A" text when unavailable is false', () => {
    const { queryByText } = render(<SensorCard {...defaultProps} unavailable={false} />);
    expect(queryByText('Sensor N/A')).toBeNull();
  });

  it('shows "Sensor N/A" text when unavailable is true', () => {
    const { getByText } = render(<SensorCard {...defaultProps} unavailable={true} />);
    expect(getByText('Sensor N/A')).toBeTruthy();
  });

  it('applies reduced opacity when unavailable', () => {
    const { toJSON } = render(<SensorCard {...defaultProps} unavailable={true} />);
    const json = JSON.stringify(toJSON());
    expect(json).toContain('"opacity":0.5');
  });

  it('applies full opacity when available', () => {
    const { toJSON } = render(<SensorCard {...defaultProps} unavailable={false} />);
    const json = JSON.stringify(toJSON());
    expect(json).toContain('"opacity":1');
  });

  it('applies color to value text', () => {
    const { toJSON } = render(<SensorCard {...defaultProps} />);
    const json = JSON.stringify(toJSON());
    expect(json).toContain('#2196F3');
  });

  it('renders different sensor types correctly', () => {
    const sensors = [
      { title: 'Temperature', value: '28°C', icon: 'thermometer', color: '#F44336' },
      { title: 'Humidity', value: '65%', icon: 'water-outline', color: '#03A9F4' },
      { title: 'pH Level', value: '6.8', icon: 'flask', color: '#9C27B0' },
    ];

    sensors.forEach(sensor => {
      const { getByText } = render(<SensorCard {...sensor} />);
      expect(getByText(sensor.title)).toBeTruthy();
      expect(getByText(sensor.value)).toBeTruthy();
    });
  });
});
