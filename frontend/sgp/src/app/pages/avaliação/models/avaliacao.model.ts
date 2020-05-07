import { Candidato } from '../../candidato/models/candidato.model';
import { Prova } from '../../prova/models/prova.model';
export class Avaliacao {
  codigo: number;
  data: Date;
  aproveitamento: number;
  candidato: Candidato;
  prova: Prova;
}
