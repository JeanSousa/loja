import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  // estou importando um outro modulo no app.module o modulo raiz
  imports: [UsuarioModule],
})
export class AppModule {}
