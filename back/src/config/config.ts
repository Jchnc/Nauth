import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  jwt_secret: process.env.JWT_SECRET_KEY,
  jwt_refresh: process.env.JWT_REFRESH_KEY,
  jwt_expires: process.env.JWT_EXPIRATION,
  frontendUrl: process.env.FRONTEND_URL,
  port: process.env.PORT,
  secure: process.env.NODE_ENV === 'production',
}));
