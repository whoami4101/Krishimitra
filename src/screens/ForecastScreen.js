import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForecastScreen() {
  const weatherForecast = [
    { day: 'Today', temp: '28°C', humidity: '65%', rain: '10%', icon: 'partly-sunny' },
    { day: 'Tomorrow', temp: '30°C', humidity: '70%', rain: '40%', icon: 'cloudy' },
    { day: 'Day 3', temp: '26°C', humidity: '80%', rain: '80%', icon: 'rainy' },
    { day: 'Day 4', temp: '25°C', humidity: '75%', rain: '60%', icon: 'rainy' },
    { day: 'Day 5', temp: '29°C', humidity: '60%', rain: '20%', icon: 'sunny' },
  ];

  const pestAlerts = [
    {
      id: 1,
      pest: 'Aphids',
      riskLevel: 'Medium',
      color: '#FF9800',
      prevention: 'Apply neem oil spray in early morning',
    },
    {
      id: 2,
      pest: 'Fungal Disease',
      riskLevel: 'High',
      color: '#F44336',
      prevention: 'Ensure proper drainage and air circulation',
    },
    {
      id: 3,
      pest: 'Caterpillars',
      riskLevel: 'Low',
      color: '#4CAF50',
      prevention: 'Regular monitoring recommended',
    },
  ];

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather & Pest Forecast</Text>
        <Text style={styles.subtitle}>5-day predictions</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weather Forecast</Text>
        {weatherForecast.map((weather, index) => (
          <View key={index} style={styles.weatherCard}>
            <View style={styles.weatherDay}>
              <Text style={styles.dayText}>{weather.day}</Text>
              <Ionicons name={weather.icon} size={32} color="#4CAF50" />
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherItem}>
                <Ionicons name="thermometer" size={16} color="#FF5722" />
                <Text style={styles.weatherText}>{weather.temp}</Text>
              </View>
              <View style={styles.weatherItem}>
                <Ionicons name="water" size={16} color="#2196F3" />
                <Text style={styles.weatherText}>{weather.humidity}</Text>
              </View>
              <View style={styles.weatherItem}>
                <Ionicons name="rainy" size={16} color="#9C27B0" />
                <Text style={styles.weatherText}>{weather.rain}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pest Alert Section</Text>
        {pestAlerts.map((alert) => (
          <View key={alert.id} style={[styles.pestCard, { borderLeftColor: alert.color }]}>
            <View style={styles.pestHeader}>
              <Text style={styles.pestName}>{alert.pest}</Text>
              <View style={[styles.riskBadge, { backgroundColor: alert.color }]}>
                <Text style={styles.riskText}>{alert.riskLevel}</Text>
              </View>
            </View>
            <View style={styles.preventionContainer}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <Text style={styles.preventionText}>{alert.prevention}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weatherCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weatherDay: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  weatherDetails: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weatherItem: {
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  pestCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pestName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  preventionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 8,
  },
  preventionText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});