import { Resource } from 'src/app/models/resource.model';

export class Avaliacao extends Resource {
  id: number;
  data: Date;
  idCandidato: number;
  nomeCandidato: string;
  tituloProva: string;
  idProva: number;
}
