import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailEhUnicoValidator } from './validacao/email-eh-unico.validator';

// todo module tem o decorator module
// é obrigatorio um objeto mesmo que seja vazio, nesse caso colocaremos a chave controllers pois ja existe um
// esse modulo precisa ser importado no modulo do app para construir a arvore da aplicação
@Module({
  controllers: [UsuarioController],
  // em providers colocamos referencias para classes que gostariamos que o nestjs gerencie a criação de objetos
  providers: [UsuarioRepository, EmailEhUnicoValidator],
})
export class UsuarioModule {}
