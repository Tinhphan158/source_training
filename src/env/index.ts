import env from './env.json';

class Config {
  static instance: any;
  state: any;
  constructor() {
    if (Config.instance) {
      return Config.instance;
    }
    this.state = {
      version: APP_VERSION,
      ...env,
    };
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
    Config.instance = this;
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  getState(): typeof env & { version: string } {
    return this.state;
  }

  setState(state: any) {
    this.state = state;
  }
}
export default Config;
