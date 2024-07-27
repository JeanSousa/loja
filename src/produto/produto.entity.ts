export class CaracteristicaProduto {
    nome: string;
    descricao: string;
}

class ImagensProduto {
    url: string;
    descricao: string;
}

export class ProdutoEntity {
    id: string;
    usuarioId: string;
    nome: string;
    valor: number;
    quantidadeDisponivel: number;
    descricao: string;
    caracteristicas: CaracteristicaProduto[];
    imagens: ImagensProduto[];
    categoria: string;
}
