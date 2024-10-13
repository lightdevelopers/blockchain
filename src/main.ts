import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
console.log("URL",process.env.DATABASE_URL);
  const config = new DocumentBuilder()
  .setTitle('Blockchain Price Tracker API')
  .setDescription('API to track blockchain prices and handle alerts')
  .setVersion('1.0')
  .addTag('prices')
  .build();

  app.setGlobalPrefix("/api/v1")

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
