import { Usuario } from './usuario.model';
import { Prova } from './prova.model';

export class Avaliacao {
  id: string;
  usuario: Usuario;
  prova: Prova;
  data: Date;
}
