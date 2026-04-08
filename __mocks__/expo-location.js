const requestForegroundPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
const getCurrentPositionAsync = jest.fn().mockResolvedValue({
  coords: { latitude: 28.6139, longitude: 77.209 },
});

module.exports = {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
};
