import { usuarioDropdown } from '../../usuario/models/usuario-dropdown';
import { provaDropdown } from '../../prova/models/provaDropdown';

export class avaliacaCadastro {

  id: number;
  data: Date;
  aproveitamento: number;
  candidato: usuarioDropdown;
  prova: provaDropdown;

}
