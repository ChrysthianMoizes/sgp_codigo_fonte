import { Usuario } from '../../usuario/models/usuario';
import { Prova } from '../../prova/models/prova';
import { Resource } from 'src/app/models/resource.model';

export class Avaliacao extends Resource {
  dataAvaliacao: Date;
  aproveitamento: number;
  candidato: Usuario;
  prova: Prova;
}
