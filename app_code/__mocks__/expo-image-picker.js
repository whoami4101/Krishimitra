const launchImageLibraryAsync = jest.fn().mockResolvedValue({ canceled: false, assets: [{ uri: 'file://test.jpg' }] });
const launchCameraAsync = jest.fn().mockResolvedValue({ canceled: false, assets: [{ uri: 'file://camera.jpg' }] });
const requestMediaLibraryPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
const requestCameraPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });

module.exports = {
  launchImageLibraryAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  MediaTypeOptions: { Images: 'Images', All: 'All' },
};
