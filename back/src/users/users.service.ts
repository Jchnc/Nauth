import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   *  Find a user by username
   * @param username  The username of the user to find
   * @returns The user with the given username or null if not found
   */
  async findOne(username: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return null;
    }

    return {
      userId: Number(user.id),
      username: user.username,
    };
  }

  /**
   *  Create a new user
   * @param createUserDto The user to create
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    const user = await this.prisma.users.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password_hash: hashedPassword,
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
      },
    });

    return {
      userId: Number(user.id),
      username: user.username,
    };
  }

  /**
   *  Find a user by ID
   * @param userId  The ID of the user to find
   * @returns The user with the given ID or null if not found
   */
  async findById(userId: number): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      userId: Number(user.id),
      username: user.username,
      password: user.password_hash,
    };
  }
}
