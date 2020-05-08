import {Prova} from '../../prova/models/prova.model';
import {Usuario} from '../../usuario/models/usuario';

export class Avaliacao {
  id: number;
  dataAvaliacao: Date;
  aproveitamento: number;
  candidato: Usuario;
  prova: Prova;
}
