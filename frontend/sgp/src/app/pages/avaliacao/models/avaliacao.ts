import {Usuario} from '../../../models/usuario.model';
import {Prova} from '../../prova/models/prova.model';

export class Avaliacao {
  id: number;
  dataAvaliacao: Date;
  aproveitamento: number;
  candidato: Usuario;
  prova: Prova;
}
