import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  jwt_secret: process.env.JWT_SECRET_KEY,
  jwt_refresh: process.env.JWT_REFRESH_KEY,
  jwt_expires: process.env.JWT_EXPIRATION,
  port: process.env.PORT,
}));
