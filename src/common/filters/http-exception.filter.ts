import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { ApiError } from '../errors/api-error.model';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const type = status === 500 ? 'api_error' : 'invalid_request_error';

    if (typeof exceptionResponse === 'string') {
      return response.status(status).json({ error: { type, status, exceptionResponse } });
    }

    const { message, statusCode, params } = exceptionResponse as Record<string, any>;

    if (params !== undefined && params.length > 0) {
      return response
        .status(status)
        .json({ error: new ApiError(type, statusCode, message, params) });
    }

    return response.status(status).json({ error: { type, statusCode, message } });
  }
}
