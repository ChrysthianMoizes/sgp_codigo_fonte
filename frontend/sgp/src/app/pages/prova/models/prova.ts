import { Questao } from '../../questao/models/questao';
import { Resource } from 'src/app/models/resource.model';
export class Prova{
  id: number;
  titulo: string;
  percentual: number;
  questoes: Questao[];
}
