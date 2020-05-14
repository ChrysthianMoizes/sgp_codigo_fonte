package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestaoMapper extends EntityMapper<QuestaoDTO, Questao> {

}
