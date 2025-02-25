import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from './entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = (await this.usersService.findOne(username)) as
      | User
      | undefined;

    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserProfile(userId: number): Promise<UserEntity> {
    try {
      const user = await this.usersService.findById(userId);

      if (!user) {
        this.logger.warn(`User not found with ID: ${userId}`);
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error: any) {
      this.logger.error(`Failed to fetch user profile: ${error}`);
      throw new NotFoundException('Could not retrieve user profile');
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
  }> {
    const payload: JwtPayload =
      await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      this.logger.warn(`User not found with ID: ${payload.sub}`);
      throw new NotFoundException('User not found');
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.userId,
        username: user.username,
      }),
      refresh_token: refreshToken,
    };
  }
}
