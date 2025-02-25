import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token for authenticated requests',
  })
  access_token: string;

  @ApiPropertyOptional({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token for obtaining new access tokens',
  })
  refresh_token?: string;

  @ApiPropertyOptional({
    example: 3600,
    description: 'Number of seconds until the access token expires',
  })
  expires_in?: number;

  @ApiPropertyOptional({
    example: 'Bearer',
    description: 'Type of token returned',
    default: 'Bearer',
  })
  token_type?: string;
}
