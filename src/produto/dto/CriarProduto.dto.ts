import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
    Min,
    ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
    nome: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
    descricao: string;
}

export class ImagensProdutoDTO {
    @IsUrl()
    url: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
    descricao: string;
}

export class CriarProdutoDTO {
    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    usuarioId: string;

    @IsString()
    @IsNotEmpty({ message: 'O nome do produto não pode ser vazio!' })
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsNumber() // quantidade minima igual a zero (pode ser maior ou igual)
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantidadeDisponivel: number;

    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    descricao: string;

    @ValidateNested() // validate nested = validação aninhada vai fazer a validacao do atributo de acordo com seu tipo (classe)
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO) // tipo de objeto que a propriedade contém
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagensProdutoDTO)
    imagens: ImagensProdutoDTO[];

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    categoria: string;
}
