import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

// o decorator controller mostra que é um controller
// e ja cria uma rota raiz, dentro dele passo o prefixo
@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criaUsuario(@Body() dadosDoUsuario) {
    // o decorator @Body mostra que a variável ira pegar do body da requisição
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }
}
