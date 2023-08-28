import { NOT_FOUND } from './constants';
import { AppError } from './appError';

export class NotFoundError extends AppError {
  public name = NOT_FOUND;
}
