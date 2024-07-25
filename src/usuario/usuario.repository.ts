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

  // o helper partial significa que irei receber um tipo usuarioEntity de forma parcial, ou seja as propriedades sao opcionais
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    // entries vai pegar todas as chaves e valores do objeto e transformar em outro array
    // tenho um array para cada chave e valor quando passo por object.entrie
    // entao [chave, valor] desestrutura cada array
    // [
    //   [ 'nome', 'Jean Sousaaaa' ],
    //   [ 'email', 'jeanjr.silvasousa@gmail.com' ],
    //   [ 'senha', 'dev1234567' ]
    // ]
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      // se chave for id faço o return pois não quero atualizar o id
      if (chave === 'id') {
        return;
      }

      possivelUsuario[chave] = valor;
    });

    return possivelUsuario;
  }
}
