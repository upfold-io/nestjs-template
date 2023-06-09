import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Paginate = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { page = 1, limit = 10 } = request.query;

  return {
    page: Number(page),
    limit: Math.min(50, Number(limit)),
  };
});
