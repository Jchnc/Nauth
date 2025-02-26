import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

const secsToMillis = (secs: number) => secs * 1000;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: secsToMillis(60),
        limit: 5,
        blockDuration: secsToMillis(60),
      },
    ]),
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
