import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeviceConnectionScreen({ onConnect }) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState(null);

  const handleConnect = async (method) => {
    setConnectionMethod(method);
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      Alert.alert(
        'Connection Successful',
        `Connected to KrishiMitra device via ${method}`,
        [{ text: 'OK', onPress: onConnect }]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="wifi" size={80} color="#4CAF50" />
        <Text style={styles.title}>Connect Device</Text>
        <Text style={styles.subtitle}>Choose connection method</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleConnect('Bluetooth')}
          disabled={isConnecting}
        >
          <Ionicons name="bluetooth" size={40} color="#2196F3" />
          <Text style={styles.optionText}>Connect via Bluetooth</Text>
          <Text style={styles.optionSubtext}>ESP32 Device</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleConnect('Wi-Fi')}
          disabled={isConnecting}
        >
          <Ionicons name="wifi" size={40} color="#FF9800" />
          <Text style={styles.optionText}>Connect via Wi-Fi</Text>
          <Text style={styles.optionSubtext}>Hotspot Connection</Text>
        </TouchableOpacity>
      </View>

      {isConnecting && (
        <View style={styles.connecting}>
          <Text style={styles.connectingText}>
            Searching for KrishiMitra Device...
          </Text>
          <Text style={styles.connectingSubtext}>
            Connecting via {connectionMethod}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.syncButton, { opacity: isConnecting ? 0.5 : 1 }]}
        disabled={isConnecting}
        onPress={() => handleConnect('Manual')}
      >
        <Text style={styles.syncButtonText}>Connect & Sync</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  options: {
    marginBottom: 40,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
    flex: 1,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666',
    marginLeft: 15,
  },
  connecting: {
    alignItems: 'center',
    marginBottom: 30,
  },
  connectingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  connectingSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  syncButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  syncButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});