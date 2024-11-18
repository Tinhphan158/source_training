import { type FirebaseApp, initializeApp } from 'firebase/app';
import { getMessaging, getToken, type MessagePayload, onMessage } from 'firebase/messaging';

import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';
import { DeviceService } from '@/utils/Device';
import { Helper } from '@/utils/Helper';
import { LoggerService } from '@/utils/Logger';

const initFirebase = async () => {
  try {
    const device = DeviceService.getInstance();

    let pushKey = device.getPushKey();

    FirebaseService.initFirebase();

    if (Helper.isEmpty(pushKey) && 'serviceWorker' in navigator) {
      // const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js?v=1');
      const permission = await window.Notification.requestPermission();
      if (permission === 'granted') {
        pushKey = await FirebaseService.getPushKey();
        device.setPushKey(pushKey);
      }
    }

    if (!Helper.isEmpty(pushKey)) {
      const messaging = getMessaging(FirebaseService.firebaseApp);
      onMessage(messaging, (payload: MessagePayload) => {
        // console.log('payload', payload?.notification?.body as string);
        toastDefault(EnumToast.INFO, payload?.notification?.body as string, { delay: 5000 });
      });
    }
    return pushKey;
  } catch (error: any) {
    LoggerService.error('FirebaseService error', error.toString());
  }
};

class FirebaseService {
  static firebaseApp: FirebaseApp;

  static initFirebase() {
    try {
      this.firebaseApp = initializeApp(Config.getInstance().getState()?.firebase?.app);
    } catch (error: any) {
      LoggerService.error('FirebaseService error', error.toString());
    }
  }

  static async getPushKey(): Promise<string | null> {
    try {
      let pushKey = '';
      const messaging = getMessaging(this.firebaseApp);
      pushKey = await getToken(messaging, { vapidKey: Config.getInstance().getState()?.firebase.vapidKey });
      return pushKey;
    } catch (error: any) {
      LoggerService.error('FirebaseService error', error.toString());
      return null;
    }
  }

  static async onMessageListener() {
    const messaging = getMessaging(this.firebaseApp);
    // eslint-disable-next-line no-new
    new Promise((resolve, reject) => {
      try {
        onMessage(messaging, (payload: MessagePayload) => {
          resolve(payload);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export { FirebaseService, initFirebase };
