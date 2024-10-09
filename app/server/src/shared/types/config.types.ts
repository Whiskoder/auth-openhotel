export type ConfigTypes = {
  port: number;
  url: string;
  version: string;
  development: boolean;
  sessions: {
    checkInterval: number;
  };
  database: {
    filename: string;
  };
  captcha: {
    enabled: boolean;
    url: string;
    id: string;
    token: string;
  };
  email: {
    enabled: boolean;
    hostname: string;
    port: number;
    username: string;
    password: string;
  };
};
