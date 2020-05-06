import { Questao } from './questao.model';

export class Prova {
  id: number;
  titulo: string;
  percentualAprovacao: number;
  questoes: Questao[];
}
