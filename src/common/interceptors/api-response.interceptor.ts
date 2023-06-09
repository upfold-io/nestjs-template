import { Observable } from 'rxjs';

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe((data) => {
      console.log(data);
      return data;
    });
  }
}
