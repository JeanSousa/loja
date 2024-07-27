import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
    private produtos = [];
    async salvar(produto: ProdutoEntity) {
        this.produtos.push(produto);
    }

    async listar() {
        return this.produtos;
    }

    private async buscaProdutoPorId(id: string) {
        return this.produtos.find((produto) => produto.id === id);
    }

    async atualizar(id: string, novosDados: Partial<ProdutoEntity>) {
        const produto = await this.buscaProdutoPorId(id);

        if (!produto) {
            throw new Error('Produto não existe');
        }

        const arrayNaoAtualizar = ['id', 'produtoId'];

        Object.entries(novosDados).forEach(([key, value]) => {
            if (arrayNaoAtualizar.includes(key)) {
                return;
            }
            produto[key] = value;
        });

        return produto;
    }

    async delete(id: string) {
        const produto = await this.buscaProdutoPorId(id);

        if (!produto) {
            return new Error('Produto não existe');
        }

        this.produtos = this.produtos.filter(
            (produtoSalvo) => produtoSalvo.id !== id,
        );

        return produto;
    }
}
