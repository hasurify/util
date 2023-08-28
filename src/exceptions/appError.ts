import { APP_ERROR } from './constants';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: number = 0,
    public langKey: string = ''
  ) {
    super();
    this.name = APP_ERROR;
  }
}
