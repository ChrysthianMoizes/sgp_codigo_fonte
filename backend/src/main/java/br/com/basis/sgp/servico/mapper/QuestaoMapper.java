package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoMapper extends EntityMapper<QuestaoDTO, Questao> {

    @Override
    @Mapping(source = "senioridade.descricao", target = "descSenioridade")
    @Mapping(source = "tipoQuestao.descricao", target = "descTipo")
    QuestaoDTO toDto(Questao entity);

}
