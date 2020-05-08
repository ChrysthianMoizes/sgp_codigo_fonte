import { Usuario } from '../../usuario/models/usuario.model';
import { Prova } from '../../prova/models/prova';
export class Avaliacao {
  id: number;
  dataAvaliacao: Date;
  aproveitamento: number;
  candidato: Usuario;
  prova: Prova;
}
