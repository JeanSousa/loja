import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';

// o decorator controller mostra que é um controller
// e ja cria uma rota raiz, dentro dele passo o prefixo
@Controller('/usuarios')
export class UsuarioController {
  // o objeto foi injetado no contrutor do controller
  // atributos podem ser criados direto no construtor no typescript
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post() // tipo cria usuario DTO tipa os dados do usuario
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    // o decorator @Body mostra que a variável ira pegar do body da requisição
    const usuarioEntity = new UsuarioEntity();
    const { email, senha, nome } = dadosDoUsuario;
    Object.assign(usuarioEntity, { email, senha, nome, id: uuid() });
    // usuarioEntity.email = dadosDoUsuario.email;
    // usuarioEntity.senha = dadosDoUsuario.senha;
    // usuarioEntity.nome = dadosDoUsuario.nome;
    // usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return { id: usuarioEntity.id, message: 'Usuário criado com sucesso!' };
  }

  @Get()
  async listaUsuarios() {
    return this.usuarioRepository.listar();
  }
}
