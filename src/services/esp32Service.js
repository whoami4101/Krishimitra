// ESP32 WiFi Service
const ESP32_IP = '192.168.4.1';
const API_ENDPOINTS = [
  `http://${ESP32_IP}/sensor`,
  `http://${ESP32_IP}/data`,
  `http://${ESP32_IP}/api/sensor-data`,
];

const fetchWithTimeout = (url, timeout = 5000) => {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    ),
  ]);
};

export const fetchESP32Data = async () => {
  // Try each endpoint
  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await fetchWithTimeout(endpoint, 3000);
      
      if (response.ok) {
        const data = await response.json();
        
        // Map ESP32 data to app format
        return {
          temperature: data.temperature || data.temp || 25,
          humidity: data.humidity || data.hum || 60,
          soilMoisture: data.soilMoisture || data.moisture || data.soil || 45,
          lightIntensity: 0,
          phLevel: 0,
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0,
        };
      }
    } catch (error) {
      console.log(`Failed to fetch from ${endpoint}:`, error.message);
      continue;
    }
  }
  
  // Return 0 values if not connected to ESP32
  return {
    temperature: 0,
    humidity: 0,
    soilMoisture: 0,
    lightIntensity: 0,
    phLevel: 0,
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  };
};

export const checkESP32Connection = async () => {
  for (const endpoint of API_ENDPOINTS) {
    try {
      const response = await fetchWithTimeout(endpoint, 2000);
      if (response.ok) return true;
    } catch (error) {
      continue;
    }
  }
  return false;
};
