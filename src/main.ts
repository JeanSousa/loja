import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // precisa ser feito o BIND do global pipes no nível de aplicação na main.ts
  // para que todos os endpoints estejam protegidos pelo GlobalPipes
  app.useGlobalPipes(
    // o pipe que vou usar é o validation pipe
    new ValidationPipe({
      // validacoes do validation pipe
      // transform true = ao executar o pipe ele transformara o json da request em um DTO criado
      transform: true,
      // whitelist true = quando o nest for utilizar esse validation ele ira ignorar as propriedades
      // que não estiverem no DTO e não dara nenhum erro ignora de forma silenciosa
      whitelist: true,
      // forbidNonWhitelisted = lança um erro se mandar um dado que não estiver no DTO
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
