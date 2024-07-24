import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriarProdutoDTO } from './dto/CriarProduto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Post()
  async criarProduto(@Body() dadosProduto: CriarProdutoDTO) {
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
