import {Questao} from '../../questao/models/questao';

export class Prova {
  id: number;
  titulo: string;
  percentualAprovacao: number;
  questoes: Questao[];
}
