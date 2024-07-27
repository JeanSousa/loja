import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriarProdutoDTO } from './dto/CriarProduto.dto';
import { v4 as uuid } from 'uuid';
import { ProdutoEntity } from './produto.entity';
import { AtualizarProdutoDTO } from './dto/AtualizarProduto.dto';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';

@Controller('/produtos')
export class ProdutoController {
    constructor(private produtoRepository: ProdutoRepository) {}

    @Post()
    async criarProduto(@Body() dadosProduto: CriarProdutoDTO) {
        const produtoEntity = new ProdutoEntity();
        Object.assign(produtoEntity, { id: uuid(), ...dadosProduto });
        this.produtoRepository.salvar(produtoEntity);
        return dadosProduto;
    }

    @Get()
    async listarProdutos() {
        const produtos = await this.produtoRepository.listar();
        const produtosListados = produtos.map(
            (produto) => new ListaProdutoDTO(produto.id, produto.nome),
        );
        return produtosListados;
    }

    @Patch('/:id')
    async atualizaProduto(
        @Param('id') id: string,
        @Body() novosDados: AtualizarProdutoDTO,
    ) {
        const produto = await this.produtoRepository.atualizar(id, novosDados);
        return {
            produto: produto,
            mensagem: 'Produto atualizado com sucesso',
        };
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string) {
        const produto = await this.produtoRepository.delete(id);

        return {
            produto: produto,
            mensagem: 'Produto foi removido com sucesso',
        };
    }
}
// https://docs.nestjs.com/pipes
// https://docs.nestjs.com/faq/request-lifecycle
