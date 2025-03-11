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
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Request as ExpressRequest, Response } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { VerifyTokenResponseDto } from './dto/verify-token-response.dto';
import { ConfigService } from '@nestjs/config';

interface AuthenticatedRequest extends ExpressRequest {
  user: JwtPayload;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AuthController.name);

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  //#region Swagger
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
  //#endregion
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const access_token = await this.authService.signIn(
        loginDto.username,
        loginDto.password,
      );
      res.cookie('access_token', access_token, {
        httpOnly: true,
        secure: this.configService.get<boolean>('config.secure'),
        sameSite: 'strict',
        maxAge: 3600 * 24 * 7, // 7 days
      });
      return res.status(HttpStatus.OK).json({ access_token });
    } catch (error: unknown) {
      this.logger.error(error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @Get('me')
  //#region Swagger
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
  //#endregion
  async getProfile(
    @Request() req: AuthenticatedRequest,
  ): Promise<UserProfileDto> {
    try {
      if (!req.user?.sub || typeof req.user.sub !== 'number') {
        this.logger.warn(`Invalid user ID in token: ${req.user?.sub}`);
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
  //#region Swagger
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New access token',
    type: AuthResponseDto,
  })
  //#endregion
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

  @Public()
  @Post('validate')
  @SkipThrottle()
  //#region Swagger
  @ApiOperation({ summary: 'Validate access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token validation result',
  })
  //#endregion
  async validateToken(
    @Request() req: ExpressRequest,
  ): Promise<VerifyTokenResponseDto> {
    const token = this.extractAccessToken(req);
    return await this.authService.validateToken(token);
  }

  private extractAccessToken(req: ExpressRequest): string {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid access token');
    }
    return token;
  }

  @Public()
  @Post('logout')
  @SkipThrottle()
  //#region Swagger
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout successful',
  })
  //#endregion
  logout(@Res() res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: this.configService.get<boolean>('config.secure'),
      sameSite: 'strict',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: this.configService.get<boolean>('config.secure'),
      sameSite: 'strict',
    });
    return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
  }
}
