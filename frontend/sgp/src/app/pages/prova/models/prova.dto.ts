import { Questao } from '../../questao/models/questao';
import { SelectItem } from 'primeng';

export class ProvaDTO{
  id: number;
  titulo: string;
  percentual: number;
  questoes: SelectItem[];
}
