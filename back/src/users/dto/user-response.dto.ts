import { IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsNumber()
  userId: number;
  @IsString()
  username: string;
}
