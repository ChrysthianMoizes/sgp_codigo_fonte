import { Questao } from '../../questao/models/questao.model';
export class Prova {
  codigo: number;
  titulo: string;
  percentualAprovacao: number;
  questoes: Questao[];
}
