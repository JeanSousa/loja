// nesta classe vou isolar a persistencia do usuario

import { Injectable } from '@nestjs/common';

// @injectable = significa que a classe é um provider
@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }
}
