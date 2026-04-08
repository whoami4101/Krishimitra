const requestPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
const scheduleNotificationAsync = jest.fn().mockResolvedValue('notification-id');
const cancelAllScheduledNotificationsAsync = jest.fn().mockResolvedValue();

module.exports = {
  requestPermissionsAsync,
  scheduleNotificationAsync,
  cancelAllScheduledNotificationsAsync,
};
