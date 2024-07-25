import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { identity } from 'rxjs';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

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
    // aqui teria que atribuir ou fazer o assign (que fiz acima) porque não tenho construtor
    // usuarioEntity.email = dadosDoUsuario.email;
    // usuarioEntity.senha = dadosDoUsuario.senha;
    // usuarioEntity.nome = dadosDoUsuario.nome;
    // usuarioEntity.id = uuid();

    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuariosLista;
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string, // decorator param informa para o nest que busca um route param
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      mensagem: 'Usuário atualizado com sucesso',
    };
  }
}
