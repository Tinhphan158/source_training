import { type FirebaseApp, initializeApp } from 'firebase/app';
import { getMessaging, getToken, type Messaging, onMessage } from 'firebase/messaging';

import Config from '@/env';
import { LoggerService } from '@/utils/Logger';

const config = new Config().getState();

class FirebaseService {
  private readonly firebaseApp: FirebaseApp | undefined;
  private static instance: FirebaseService;

  constructor() {
    if (!FirebaseService.instance) {
      this.firebaseApp = initializeApp(config.firebase.app);
      this.getPushKey = this.getPushKey.bind(this);
      this.onMessageListener = this.onMessageListener.bind(this);
      FirebaseService.instance = this;
    }
    return FirebaseService.instance;
  }

  public async getPushKey(): Promise<string> {
    let pushKey = '-';
    try {
      LoggerService.info('FirebaseService execute getPushKey');
      const messaging: any = getMessaging(this.firebaseApp);
      pushKey = await getToken(messaging, { vapidKey: messaging.validKey });
      LoggerService.debug('FirebaseService execute getPushKey receive pushKey', pushKey);
      return pushKey;
    } catch (error: any) {
      LoggerService.error('FirebaseService execute getPushKey error', error);
      throw new Error(error);
    }
  }

  public async onMessageListener(): Promise<void> {
    LoggerService.info('FirebaseService execute onMessageListener');
    const messaging: Messaging = getMessaging(this.firebaseApp);
    await new Promise<void>((resolve, reject) => {
      try {
        onMessage(messaging, payload => {
          LoggerService.debug('FirebaseService execute onMessageListener receive message', payload);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new FirebaseService();
