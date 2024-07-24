import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioRepository } from '../usuario.repository';
import { Injectable } from '@nestjs/common';

// ESSE PROVIDER DEVE SER INJETADO NA MODULE DE USUARIOS
@Injectable() // transformando um provider para injetar a dependencia do usuario repository
@ValidatorConstraint({ async: true }) //decorator para mostrar que é assincrono passando o options async
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExist =
      await this.usuarioRepository.existeComEmail(value);
    // faço a negacao pois se retorna false ou seja se o usuario com email existe eu lanço mensagens de erro
    return !usuarioComEmailExist;
  }
}

// o decorator é uma função que retorna uma função e tem parametro tipado como validation options
export const EmailEhUnico = (opcoesDeValidacoes: ValidationOptions) => {
  // objeto onde ta sendo executado e o segundo parametro é a propriedade onde esta sendo executado
  return (objeto: Object, propriedade: string) => {
    // registrar o decorator que vai agir sobre o objeto e propriedade mas vai usar a classe de validação acima
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacoes,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
