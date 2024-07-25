// nesta classe vou isolar a persistencia do usuario

import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

// @injectable = significa que a classe é um provider
@Injectable()
export class UsuarioRepository {
  // variavel de usuarios é tipada como entidade de usuario
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    // o metodo find vai percorrer o array e vai retornar
    // caso o usuario.email (do array) for igual ao email passado como parametro
    // caso não encontre retorna undefined
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUsuario !== undefined;
  }
}
