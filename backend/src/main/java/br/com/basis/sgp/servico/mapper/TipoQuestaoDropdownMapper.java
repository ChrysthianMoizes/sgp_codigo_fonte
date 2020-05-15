package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TipoQuestaoDropdownMapper extends EntityMapper<SelectDTO, TipoQuestao> {

    @Override
    @Mapping(target = "value", source = "id")
    @Mapping(target = "label", source = "descricao")
    SelectDTO toDto(TipoQuestao entity);

}
