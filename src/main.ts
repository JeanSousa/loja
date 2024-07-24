import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // precisa ser feito o BIND do global pipes no nível de aplicação na main.ts
  // para que todos os endpoints estejam protegidos pelo GlobalPipes
  // "um pipe é uma classe com decorator @injectable que é um provider
  // nesse caso o pipe global serve para ser aplicado em todos os handlers de rotas"
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

  // para o class validator saber buscar o usuario repository que esta no construtor da classe emailehunicovalidator
  // para usar o mesmo container de resolução de dependencia uso o trecho abaixo
  // passo uma referencia do module da raiz da aplicação para o class validator resolver a dependencia
  // no use container options passo o fallback on errors caso ele não encontre a dependencia com o module app module
  // ele tenta usar um proprio container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
