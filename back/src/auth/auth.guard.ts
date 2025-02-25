import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicEndpoint(context)) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      this.logger.warn('No token provided in request');
      throw new UnauthorizedException('Authentication token required');
    }

    try {
      const payload = await this.verifyToken(token);
      this.attachUserToRequest(request, payload);
      return true;
    } catch (error: unknown) {
      this.handleTokenError(error);
    }
  }

  private isPublicEndpoint(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private extractTokenFromRequest(request: Request): string | null {
    const headerToken = this.extractTokenFromHeader(request);
    return headerToken;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private async verifyToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: jwtConstants.secret,
    });
  }

  private attachUserToRequest(request: Request, payload: JwtPayload): void {
    request['user'] = {
      userId: payload.sub,
      username: payload.username,
    };
  }

  private handleTokenError(error: unknown): never {
    this.logger.error('Token validation failed');

    if (error instanceof Error) {
      this.logger.error(`Error details: ${error.message}`);

      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
    }

    throw new UnauthorizedException('Invalid authentication token');
  }
}
