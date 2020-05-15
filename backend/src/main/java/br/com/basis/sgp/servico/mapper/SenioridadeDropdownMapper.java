package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SenioridadeDropdownMapper extends EntityMapper<SelectDTO, Senioridade> {

    @Override
    @Mapping(target = "value", source = "id")
    @Mapping(target = "label", source = "descricao")
    SelectDTO toDto(Senioridade entity);

}
