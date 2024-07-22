import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

// o decorator controller mostra que é um controller
// e ja cria uma rota raiz, dentro dele passo o prefixo
@Controller('/usuarios')
export class UsuarioController {
  // o objeto foi injetado no contrutor do controller
  // atributos podem ser criados direto no construtor no typescript
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario) {
    // o decorator @Body mostra que a variável ira pegar do body da requisição
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}
