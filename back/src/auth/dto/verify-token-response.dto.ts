import { JwtPayload } from '../../interfaces/jwt-payload.interface';

export class VerifyTokenResponseDto {
  valid: boolean;
  message: string;
  payload?: JwtPayload;
  error?: string;
}
