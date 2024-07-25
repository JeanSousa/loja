export class ListaUsuarioDTO {
  // caso crio um construtor não preciso atribuir os valores como na entidade
  // que instanciei no controller
  constructor(
    // readonly pois sao propriedades publicas
    readonly id: string,
    readonly nome: string,
  ) {}
}
