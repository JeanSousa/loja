import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';

// todo module tem o decorator module
// é obrigatorio um objeto mesmo que seja vazio, nesse caso colocaremos a chave controllers pois ja existe um
// esse modulo precisa ser importado no modulo do app para construir a arvore da aplicação
@Module({
  controllers: [UsuarioController],
})
export class UsuarioModule {}
