# KrishiMitra - Smart Farming Companion

A React Native Expo app for monitoring farm conditions using IoT sensors and providing AI-powered insights for better farming decisions.

## Features

### 🌱 Core Features
- **Real-time Monitoring**: Live sensor data for soil moisture, temperature, humidity, and light intensity
- **AI Insights**: Smart recommendations based on farm data analysis
- **Weather Forecasting**: 5-day weather predictions with farming recommendations
- **Pest Alerts**: Risk assessment and preventive measures for common pests
- **Historical Data**: Interactive charts showing trends over time
- **Device Connectivity**: Bluetooth and Wi-Fi connection to ESP32 sensors

### 📱 App Screens
1. **Splash & Onboarding**: Welcome screens with feature introduction
2. **Device Connection**: Connect to farming sensors via Bluetooth/Wi-Fi
3. **Dashboard**: Real-time sensor data and quick AI insights
4. **History**: Interactive charts with data filtering options
5. **AI Insights**: Detailed recommendations with color-coded alerts
6. **Forecast**: Weather predictions and pest risk assessments
7. **Settings**: Crop selection, thresholds, and app preferences

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd KrishiMitra
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on device/simulator:
   ```bash
   # For Android
   npm run android
   
   # For iOS (macOS only)
   npm run ios
   
   # For web
   npm run web
   ```

## Project Structure

```
KrishiMitra/
├── src/
│   ├── screens/           # App screens
│   │   ├── SplashScreen.js
│   │   ├── OnboardingScreen.js
│   │   ├── DeviceConnectionScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── HistoryScreen.js
│   │   ├── AIInsightsScreen.js
│   │   ├── ForecastScreen.js
│   │   └── SettingsScreen.js
│   ├── components/        # Reusable components
│   │   ├── SensorCard.js
│   │   └── InsightCard.js
│   └── utils/            # Utility functions
│       └── notifications.js
├── App.js                # Main app component
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## Key Dependencies

- **@react-navigation/native**: Navigation framework
- **@react-navigation/bottom-tabs**: Bottom tab navigation
- **@react-navigation/stack**: Stack navigation
- **@expo/vector-icons**: Icon library
- **expo-notifications**: Push notifications
- **expo-linear-gradient**: Gradient backgrounds
- **react-native-chart-kit**: Charts and graphs
- **react-native-svg**: SVG support for charts

## Hardware Integration

The app is designed to work with ESP32-based IoT sensors that measure:
- Soil moisture levels
- Air temperature
- Humidity
- Light intensity

### Connection Methods
- **Bluetooth**: Direct connection to ESP32 device
- **Wi-Fi Hotspot**: Connect through device's Wi-Fi network

## Features in Detail

### Dashboard
- Real-time sensor data cards with color-coded values
- Quick AI insights with actionable recommendations
- Pull-to-refresh functionality for latest data

### AI Insights
- Status indicators (Good/Warning/Critical)
- Detailed recommendations for each condition
- Color-coded alerts for easy identification

### Historical Data
- Interactive line charts for all sensor parameters
- Time period filters (Today/7 days/30 days)
- Export functionality for data sharing

### Weather & Pest Forecast
- 5-day weather predictions with farming impact
- Pest risk assessment based on environmental conditions
- Preventive action recommendations

### Settings
- Crop type selection (Wheat, Rice, Maize, etc.)
- Customizable soil moisture thresholds
- Multi-language support (English, Hindi, Regional languages)
- Notification preferences

## Notifications

The app provides intelligent notifications for:
- Low soil moisture alerts
- Weather change warnings
- Pest risk notifications
- Daily farm check reminders

## Development

### Adding New Features
1. Create new screen in `src/screens/`
2. Add navigation route in `App.js`
3. Create reusable components in `src/components/`
4. Add utility functions in `src/utils/`

### Customization
- Modify colors in component styles
- Add new crop types in Settings screen
- Extend sensor data types in Dashboard
- Add new chart types in History screen

## Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: support@krishimitra.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**KrishiMitra** - Empowering farmers with smart technology for better crop management and increased yields.