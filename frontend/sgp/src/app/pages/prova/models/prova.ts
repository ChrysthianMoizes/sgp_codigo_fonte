import { Questao } from '../../questao/models/questao';
import { Resource } from 'src/app/models/resource.model';
export class Prova extends Resource {
  titulo: string;
  percentualAprovacao: number;
  questoes: Questao[];
}
