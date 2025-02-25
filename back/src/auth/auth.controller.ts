import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: JwtPayload;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger(AuthController.name);

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: () => LoginDto, required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully logged in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      return await this.authService.signIn(
        loginDto.username,
        loginDto.password,
      );
    } catch (error: unknown) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile data',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserProfileDto> {
    try {
      if (!req.user?.sub || typeof req.user.sub !== 'number') {
        this.logger.warn('Invalid user ID in token');
        throw new UnauthorizedException('Invalid user ID in token');
      }
      const userId: number = req.user.sub;
      const userData = await this.authService.getUserProfile(userId);

      if (!userData) {
        this.logger.warn('User not found');
        throw new BadRequestException('User not found');
      }
      return {
        userId: userData.userId,
        username: userData.username,
        email: userData.email,
      };
    } catch (error: any) {
      if (error instanceof Error) {
        this.logger.error(`Profile error: ${error.message}`);
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Unknown authentication error');
    }
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New access token',
    type: AuthResponseDto,
  })
  async refreshToken(@Request() req: ExpressRequest): Promise<AuthResponseDto> {
    const refreshToken = this.extractRefreshToken(req);
    return await this.authService.refreshToken(refreshToken);
  }

  private extractRefreshToken(req: ExpressRequest): string {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return token;
  }
}
