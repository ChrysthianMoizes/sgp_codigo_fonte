import { Senioridade } from '../../senioridade/models/senioridade';
import { TipoQuestao } from '../../tipo-questao/models/tipo-questao';

export class Questao {
  id: number;
  descricao: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
  alternativa5: string;
  resposta: number;
  senioridade: Senioridade;
  tipoQuestao: TipoQuestao;
}
