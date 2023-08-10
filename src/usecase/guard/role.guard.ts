import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../../domain/enum/role.enum';
import { UnauthorizedRoleException } from '../exceptions/UnauthorizedRoleException';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      throw new UnauthorizedRoleException();
    }
    const { user } = context.switchToHttp().getRequest();
    const isAuthorized = requiredRoles.some((role) =>
      user.role?.includes(role),
    );
    if (!isAuthorized) {
      throw new UnauthorizedRoleException();
    }
    return true;
  }
}
