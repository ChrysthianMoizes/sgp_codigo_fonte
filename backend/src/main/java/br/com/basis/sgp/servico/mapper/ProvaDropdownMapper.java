package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface ProvaDropdownMapper extends EntityMapper<SelectDTO, Prova>{

    @Override
    @Mapping(source ="id" ,target ="value")
    @Mapping(source = "titulo", target = "label")
    SelectDTO toDto(Prova entity);

}
