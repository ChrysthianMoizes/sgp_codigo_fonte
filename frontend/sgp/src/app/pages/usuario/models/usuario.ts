import { Resource } from 'src/app/models/resource.model';

export class Usuario extends Resource {

  nome: string;
  cpf: string;
  senha: string;
  email: string;

}
