import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateFederatedSchema } from './federated-schema-generator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await generateFederatedSchema(app);
  await app.listen(3000);
}
bootstrap();
