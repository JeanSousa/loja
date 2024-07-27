import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Min,
    ValidateNested,
} from 'class-validator';

export class CaracteristicaProdutoDTO {
    @IsString({
        message: 'O nome da característica do produto deve ser uma string',
    })
    @IsOptional()
    nome: string;

    @IsString({
        message: 'A descrição da característica do produto deve ser uma string',
    })
    @IsOptional()
    descricao: string;
}

export class ImagensProdutoDTO {
    @IsUrl()
    @IsOptional()
    url: string;

    @IsString({
        message: 'A descrição da imagem do produto deve ser uma string',
    })
    @IsOptional()
    descricao: string;
}

export class AtualizarProdutoDTO {
    @IsUUID(undefined, { message: 'ID do produto invalido' })
    id: string;

    @IsUUID(undefined, { message: 'ID de usuário inválido' })
    usuarioId: string;

    @IsString({ message: 'O nome do proudot deve ser uma string' })
    @IsOptional()
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    @IsOptional()
    valor: number;

    @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
    @Min(0, { message: 'Quantidade mínima inválida' })
    @IsOptional()
    quantidadeDisponivel: number;

    @IsString({ message: 'A descricao do produto deve ser uma string' })
    @IsOptional()
    descricao: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    @Type(() => CaracteristicaProdutoDTO)
    @IsOptional()
    caracteristicas: CaracteristicaProdutoDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => ImagensProdutoDTO)
    @IsOptional()
    imagens: ImagensProdutoDTO[];

    @IsString({ message: 'A categoria do produto deve ser uma string' })
    @IsOptional()
    categoria: string;
}
