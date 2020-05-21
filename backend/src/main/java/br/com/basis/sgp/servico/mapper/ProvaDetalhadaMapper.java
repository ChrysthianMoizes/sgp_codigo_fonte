package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.ProvaDetalhadaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {QuestaoDetalhadaMapper.class})
public interface ProvaDetalhadaMapper extends EntityMapper<ProvaDetalhadaDTO, Prova>{
}
