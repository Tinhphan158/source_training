declare namespace NodeJS {
  interface IProcessEnv {
    // types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    APP_VERSION: string;
    npm_package_version: string;
    npm_package_name: string;
  }
}

declare var process: {
  env: {
    PUBLIC_URL: string;
    NODE_ENV: string;
    APP_VERSION: string;
    npm_package_version: string;
    npm_package_name: string;
  };
};
