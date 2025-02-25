import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the user',
  })
  userId: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  username: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'The email address of the user',
  })
  email?: string;
}
