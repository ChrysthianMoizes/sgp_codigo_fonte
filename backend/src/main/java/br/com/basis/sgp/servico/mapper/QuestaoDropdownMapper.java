package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestaoDropdownMapper extends EntityMapper<SelectDTO, Questao> {

    @Override
    @Mapping(target = "value", source = "id")
    @Mapping(target = "label", source = "descricao")
    SelectDTO toDto(Questao entity);

}
