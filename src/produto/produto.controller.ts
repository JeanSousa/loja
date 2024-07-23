import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criarProduto(@Body() dadosProduto) {
    this.produtoRepository.salvar(dadosProduto);
    return dadosProduto;
  }

  @Get()
  async listarProdutos() {
    return this.produtoRepository.listar();
  }
}
// https://docs.nestjs.com/pipes
// https://docs.nestjs.com/faq/request-lifecycle
