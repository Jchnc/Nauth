import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ example: 1, description: 'The user ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'john_doe', description: 'The username' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
    nullable: true,
  })
  @IsString()
  first_name: string | null;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
    nullable: true,
  })
  @IsString()
  last_name: string | null;

  @ApiProperty({
    example: true,
    description: 'Whether the user is active',
    nullable: true,
  })
  @IsBoolean()
  is_active: boolean | null;

  @ApiProperty({
    example: false,
    description: 'Whether the user is an admin',
    nullable: true,
  })
  @IsBoolean()
  is_admin: boolean | null;

  @ApiProperty({
    example: '2023-10-01T00:00:00.000Z',
    description: 'The date the user was created',
    nullable: true,
  })
  @IsDate()
  created_at: Date | null;

  @ApiProperty({
    example: '2023-10-01T00:00:00.000Z',
    description: 'The date the user was last updated',
    nullable: true,
  })
  @IsDate()
  updated_at: Date | null;
}
