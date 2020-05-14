package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoListagemMapper extends EntityMapper<QuestaoListagemDTO, Questao> {

    @Override
    @Mapping(target = "descricaoSenioridade", source = "senioridade.descricao")
    @Mapping(target = "descricaoTipo", source = "tipoQuestao.descricao")
    QuestaoListagemDTO toDto(Questao entity);

}
