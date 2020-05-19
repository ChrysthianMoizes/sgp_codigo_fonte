package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestaoDropdownMapper extends EntityMapper<SelectDTO, Questao> {

    @Override
    @Mapping(source = "id", target = "value")
    @Mapping(source = "descricao", target = "label")
    SelectDTO toDto(Questao entity);

    @Override
    @Mapping(source = "value", target = "id")
    @Mapping(source = "label", target = "descricao")
    Questao toEntity(SelectDTO DTO);

}
