import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);

  async signIn(username: string, pass: string): Promise<string> {
    const user = (await this.usersService.findOne(username)) as
      | UserResponseDto
      | undefined;

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValid = await compare(pass, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, username: user.username };
    return await this.jwtService.signAsync(payload);
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
