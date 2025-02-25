import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({
    name: 'username',
    required: true,
    description: 'The username of the user to retrieve',
    example: 'john_doe',
  })
  @ApiOkResponse({
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async findOne(
    @Param('username') username: string,
  ): Promise<UserResponseDto | null> {
    return await this.usersService.findOne(username);
  }
}
