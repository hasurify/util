import { UNKNOWN_ERROR } from './constants';
import { AppError } from './appError';

export class UnknownError extends AppError {
  public name = UNKNOWN_ERROR;
}
