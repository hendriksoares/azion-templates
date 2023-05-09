import axios, { AxiosStatic } from 'axios';

/**
 * Abstract class with azion configuration to access API's
 * The autorization can use personal token or cookie
 * Obs.: This implemantation use environment variable.
 */
export abstract class AzionService {
  url: string;
  token?: string;
  config: any;
  http: AxiosStatic;

  constructor() {
    if (process.env.AZION_PERSONAL_TOKEN) {
      this.config = {
        headers: {
          Accept: 'application/json; version=3',
          Authorization: `Token ${this.token}`,
          'Content-Type': 'application/json',
        },
      };
    } else {
      this.config = {
        headers: {
          Accept: 'application/json; version=3',
          Cookie: `${process.env.COOKIE_AUTH_NAME}=${process.env.COOKIE_AUTH}`,
          'Content-Type': 'application/json',
        },
      };
    }

    this.url = `${process.env.AZION_API_URL}`;

    this.http = axios;
  }
}
