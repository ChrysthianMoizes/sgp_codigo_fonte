package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {QuestaoDropdownMapper.class})
public interface ProvaMapper extends EntityMapper<ProvaDTO, Prova>{
}
