import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'The user ID' })
  @IsNumber()
  userId: number;
  @ApiProperty({ example: 'john_doe', description: 'The username' })
  @IsString()
  username: string;
}
