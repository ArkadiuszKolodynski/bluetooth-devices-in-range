import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Devices API')
    .setDescription('The devices API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  console.log(document.paths);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
