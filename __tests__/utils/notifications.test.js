import {
  scheduleNotification,
  scheduleFarmAlerts,
  sendMoistureAlert,
  sendWeatherAlert,
} from '../../src/utils/notifications';
import * as Notifications from 'expo-notifications';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('notifications utils', () => {
  describe('scheduleNotification', () => {
    it('requests permissions and schedules when granted', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      Notifications.scheduleNotificationAsync.mockResolvedValueOnce('id-1');

      await scheduleNotification('Title', 'Body');

      expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(1);
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({ title: 'Title', body: 'Body', sound: true }),
        })
      );
    });

    it('does not schedule when permission is denied', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'denied' });

      await scheduleNotification('Title', 'Body');

      expect(Notifications.scheduleNotificationAsync).not.toHaveBeenCalled();
    });

    it('uses provided trigger when given', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });
      const customTrigger = { hour: 8, minute: 0, repeats: true };

      await scheduleNotification('Title', 'Body', customTrigger);

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({ trigger: customTrigger })
      );
    });

    it('falls back to 1-second trigger when none provided', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: 'granted' });

      await scheduleNotification('Title', 'Body');

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({ trigger: { seconds: 1 } })
      );
    });

    it('handles errors without throwing', async () => {
      Notifications.requestPermissionsAsync.mockRejectedValueOnce(new Error('Permission error'));

      await expect(scheduleNotification('Title', 'Body')).resolves.toBeUndefined();
    });
  });

  describe('scheduleFarmAlerts', () => {
    it('schedules two notifications (morning and evening)', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

      scheduleFarmAlerts();

      // Flush all pending microtasks/promises
      await new Promise(r => setTimeout(r, 0));

      // scheduleFarmAlerts calls scheduleNotification twice (morning + evening)
      expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(2);
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('sendMoistureAlert', () => {
    it('schedules alert when moisture is below threshold (25)', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

      sendMoistureAlert(20);

      // Give the promise a tick to start
      await Promise.resolve();
      expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    });

    it('does not schedule alert when moisture is at or above threshold', async () => {
      sendMoistureAlert(25);
      await Promise.resolve();
      expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
    });

    it('includes moisture level in notification body', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

      sendMoistureAlert(10);
      // Flush microtasks
      await new Promise(r => setTimeout(r, 0));

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            body: expect.stringContaining('10%'),
          }),
        })
      );
    });
  });

  describe('sendWeatherAlert', () => {
    it('schedules a weather alert with condition in body', async () => {
      Notifications.requestPermissionsAsync.mockResolvedValue({ status: 'granted' });

      sendWeatherAlert('Heavy Rain');
      await new Promise(r => setTimeout(r, 0));

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            title: 'Weather Alert',
            body: expect.stringContaining('Heavy Rain'),
          }),
        })
      );
    });
  });
});
