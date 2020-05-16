import {Resource} from 'src/app/models/resource.model';
import {Senioridade} from '../../../models/senioridade';
import {TipoQuestao} from '../../../models/tipo-questao';

export class Questao extends Resource {
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
