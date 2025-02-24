import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { Public } from './isPublic';

interface JwtPayload {
  sub: number;
  username: string;
}

interface AuthenticatedRequest extends ExpressRequest {
  user: JwtPayload;
}

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(
      signInDto.username as string,
      signInDto.password as string,
    );
  }

  @Get('me')
  getMe(@Request() req: AuthenticatedRequest): JwtPayload {
    return req.user;
  }
}
