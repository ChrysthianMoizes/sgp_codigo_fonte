package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoDetalhaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoDetalhadaMapper extends EntityMapper<QuestaoDetalhaDTO, Questao> {
}
