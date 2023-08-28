import { AppError } from './appError';
import { BAD_REQUEST } from './constants';

export class BadRequestError extends AppError {
  public name = BAD_REQUEST;
}
