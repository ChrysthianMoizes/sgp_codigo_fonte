package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioDropdownMapper extends EntityMapper<SelectDTO, Usuario> {

    @Override
    @Mapping(source = "nome", target = "label")
    @Mapping(source = "id", target = "value")
    SelectDTO toDto(Usuario entity);

}
