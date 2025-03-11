import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('config.frontendUrl'),
    credentials: true,
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Nauth API')
    .setDescription('API for Nauth')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = configService.get<number>('config.port') ?? 3001;
  logger.log(`Application starting on port ${port}`);
  logger.log(
    `Frontend URL: ${configService.get<string>('config.frontendUrl')}`,
  );

  await app.listen(port);
}
void bootstrap();
