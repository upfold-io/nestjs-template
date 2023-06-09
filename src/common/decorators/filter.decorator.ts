import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Filter = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.query;
});
