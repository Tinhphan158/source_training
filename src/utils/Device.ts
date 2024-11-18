import { browserName, browserVersion, osName, osVersion } from 'react-device-detect';

import Config from '@/env';

import { Helper } from './Helper';

export interface IDevice {
  deviceProducer: string | undefined;
  deviceModel: string | undefined;
  deviceName: string | undefined;
  deviceDisplayName: string | undefined;
  deviceType: number | undefined;
  pushKey?: string | undefined;
  platformOS: string | undefined;
  versionOS: string | undefined;
  applicationVersion: string | undefined;
  deviceKey: string | undefined;
}

export class DeviceService {
  static instance: DeviceService;
  static key = Config.getInstance().getState()?.deviceKey;

  static getInstance(): DeviceService {
    if (!DeviceService.instance) {
      DeviceService.instance = new DeviceService();
    }

    return DeviceService.instance;
  }

  randomDeviceKey(): string {
    return `${Helper.randomBase64()}:${Helper.randomBase64()}$${Helper.randomBase64()}`;
  }

  setDevice(): IDevice | null {
    try {
      const payload = {
        deviceProducer: browserName,
        deviceModel: osVersion,
        deviceName: browserName,
        deviceDisplayName: `${browserName} ${browserVersion}`,
        deviceType: Config.getInstance().getState()?.deviceType,
        platformOS: osName,
        versionOS: browserVersion,
        applicationVersion: Config.getInstance().getState()?.version,
        deviceKey: this.randomDeviceKey(),
        pushKey: '',
      };
      localStorage.setItem(DeviceService.key, JSON.stringify(payload));
      return payload;
    } catch {
      return null;
    }
  }

  getDevice() {
    const device = localStorage.getItem(DeviceService.key);

    if (!device) {
      return this.setDevice();
    }

    return JSON.parse(device);
  }

  setPushKey(key: string) {
    const device = this.getDevice();

    device.pushKey = key;
    localStorage.setItem(DeviceService.key, JSON.stringify(device));
    return device;
  }

  getPushKey() {
    const device = this.getDevice();
    return device.pushKey;
  }

  setFlag() {
    localStorage.setItem(DeviceService.key.slice(0, 5), 'true');
  }

  getFlag() {
    return localStorage.getItem(DeviceService.key.slice(0, 5));
  }
}
