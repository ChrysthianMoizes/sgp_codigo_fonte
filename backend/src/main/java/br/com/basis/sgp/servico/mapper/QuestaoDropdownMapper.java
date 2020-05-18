package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoDropdownMapper extends EntityMapper<SelectDTO, Questao>{

    @Override
    @Mapping(source = "descricao", target = "label")
    @Mapping(source = "id", target = "value")
    SelectDTO toDto(Questao entity);

    @Override
    @Mapping(source = "value", target = "id")
    Questao toEntity(SelectDTO Dto);
}
