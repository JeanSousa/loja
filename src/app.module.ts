import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [],
  // colocar a referencia do controller na arvore de controllers do nestjs
  controllers: [UsuarioController],
  providers: [],
})
export class AppModule {}
