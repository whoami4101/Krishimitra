import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [soilThreshold, setSoilThreshold] = useState(30);

  const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Soybean'];
  const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Punjabi'];

  const showCropSelector = () => {
    Alert.alert(
      'Select Crop Type',
      'Choose your primary crop',
      crops.map(crop => ({
        text: crop,
        onPress: () => setSelectedCrop(crop),
      }))
    );
  };

  const showLanguageSelector = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      languages.map(lang => ({
        text: lang,
        onPress: () => setSelectedLanguage(lang),
      }))
    );
  };

  const showThresholdSelector = () => {
    Alert.alert(
      'Soil Moisture Threshold',
      'Set minimum soil moisture level for alerts',
      [
        { text: '20%', onPress: () => setSoilThreshold(20) },
        { text: '25%', onPress: () => setSoilThreshold(25) },
        { text: '30%', onPress: () => setSoilThreshold(30) },
        { text: '35%', onPress: () => setSoilThreshold(35) },
      ]
    );
  };

  const SettingItem = ({ icon, title, subtitle, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#4CAF50" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color="#666" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your farming experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Configuration</Text>
        
        <SettingItem
          icon="leaf"
          title="Crop Type"
          subtitle={selectedCrop}
          onPress={showCropSelector}
        />
        
        <SettingItem
          icon="water"
          title="Soil Moisture Threshold"
          subtitle={`${soilThreshold}% - Alert when below this level`}
          onPress={showThresholdSelector}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <SettingItem
          icon="notifications"
          title="Push Notifications"
          subtitle="Receive alerts for critical conditions"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <SettingItem
          icon="language"
          title="Language"
          subtitle={selectedLanguage}
          onPress={showLanguageSelector}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <SettingItem
          icon="help-circle"
          title="Help & FAQ"
          subtitle="Get help with using KrishiMitra"
          onPress={() => Alert.alert('Help', 'Help documentation coming soon!')}
        />
        
        <SettingItem
          icon="mail"
          title="Contact Support"
          subtitle="Get in touch with our team"
          onPress={() => Alert.alert('Contact', 'Email: support@krishimitra.com')}
        />
        
        <SettingItem
          icon="information-circle"
          title="About KrishiMitra"
          subtitle="Version 1.0.0"
          onPress={() => Alert.alert('About', 'KrishiMitra - Smart Farming Companion\nVersion 1.0.0\n\nDeveloped for farmers to monitor and optimize their crops using IoT sensors and AI insights.')}
        />
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
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
  settingItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});