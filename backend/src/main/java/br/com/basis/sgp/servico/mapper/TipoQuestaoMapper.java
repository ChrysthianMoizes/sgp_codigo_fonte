package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.servico.dto.TipoQuestaoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TipoQuestaoMapper extends EntityMapper<TipoQuestaoDTO, TipoQuestao> {
}
