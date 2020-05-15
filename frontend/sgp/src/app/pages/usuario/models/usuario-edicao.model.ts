import { Resource } from 'src/app/models/resource.model';

export class UsuarioEdicao extends Resource {
  id: number;
  nome: string;
  senha: string;
  email: string;
}
