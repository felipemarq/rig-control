import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const DebugEndpoint = createParamDecorator<undefined>(
  (_data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const userId = request.userId;
    const path = request.path;

    if (!userId) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }
    return userId;
  },
);
