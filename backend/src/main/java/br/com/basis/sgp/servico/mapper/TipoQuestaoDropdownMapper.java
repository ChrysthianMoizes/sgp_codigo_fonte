package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface TipoQuestaoDropdownMapper extends EntityMapper<SelectDTO, TipoQuestao> {

    @Override
    @Mapping(source = "id", target = "value")
    @Mapping(source = "descricao", target = "label")
    SelectDTO toDto(TipoQuestao entity);

}
