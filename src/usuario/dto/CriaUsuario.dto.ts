import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';

export class CriaUsuarioDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  nome: string;

  // @decorator do class validator (precisa ser feito o BIND do global pipes no nível de aplicação na main.ts
  // para que todos os endpoints estejam protegidos pelo GlobalPipes)
  // o primeiro parametro serve para personalizar a validação de email, o segundo é um objeto de validation options
  @IsEmail(undefined, { message: 'O e-mail informado é invalido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este email' })
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
