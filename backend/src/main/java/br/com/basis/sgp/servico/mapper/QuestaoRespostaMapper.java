package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoDetalhaDTO;
import br.com.basis.sgp.servico.dto.QuestaoRespostaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoRespostaMapper extends EntityMapper<QuestaoRespostaDTO, Questao> {
}
