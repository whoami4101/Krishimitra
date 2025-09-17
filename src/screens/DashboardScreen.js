import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SensorCard from '../components/SensorCard';
import InsightCard from '../components/InsightCard';

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 65,
    lightIntensity: 75,
    nitrogen: 85,
    phosphorus: 42,
    potassium: 68,
    phLevel: 6.8,
  });

  const [insights, setInsights] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Soil moisture at 45% - Consider irrigation',
      icon: 'water',
      color: '#FF9800',
    },
    {
      id: 2,
      type: 'good',
      message: 'Temperature normal - No action required',
      icon: 'thermometer',
      color: '#4CAF50',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setSensorData({
        soilMoisture: Math.floor(Math.random() * 100),
        temperature: Math.floor(Math.random() * 15) + 20,
        humidity: Math.floor(Math.random() * 40) + 40,
        lightIntensity: Math.floor(Math.random() * 50) + 50,
        nitrogen: Math.floor(Math.random() * 40) + 60,
        phosphorus: Math.floor(Math.random() * 30) + 30,
        potassium: Math.floor(Math.random() * 40) + 50,
        phLevel: (Math.random() * 2 + 6).toFixed(1),
      });
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.farmName}>My Farm</Text>
        <Text style={styles.cropType}>Wheat Crop</Text>
      </View>

      <View style={styles.sensorGrid}>
        <SensorCard
          title="Soil Moisture"
          value={`${sensorData.soilMoisture}%`}
          icon="water"
          color="#2196F3"
        />
        <SensorCard
          title="Temperature"
          value={`${sensorData.temperature}°C`}
          icon="thermometer"
          color="#FF5722"
        />
        <SensorCard
          title="Humidity"
          value={`${sensorData.humidity}%`}
          icon="cloud"
          color="#9C27B0"
        />
        <SensorCard
          title="Light Intensity"
          value={`${sensorData.lightIntensity}%`}
          icon="sunny"
          color="#FFC107"
        />
        <SensorCard
          title="pH Level"
          value={sensorData.phLevel}
          icon="flask"
          color="#9C27B0"
        />
        <SensorCard
          title="Nitrogen (N)"
          value={`${sensorData.nitrogen} ppm`}
          icon="leaf"
          color="#4CAF50"
        />
        <SensorCard
          title="Phosphorus (P)"
          value={`${sensorData.phosphorus} ppm`}
          icon="flash"
          color="#FF9800"
        />
        <SensorCard
          title="Potassium (K)"
          value={`${sensorData.potassium} ppm`}
          icon="fitness"
          color="#795548"
        />
      </View>

      <View style={styles.insightsSection}>
        <Text style={styles.sectionTitle}>AI Quick Insights</Text>
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
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
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 50,
  },
  farmName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cropType: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  insightsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});