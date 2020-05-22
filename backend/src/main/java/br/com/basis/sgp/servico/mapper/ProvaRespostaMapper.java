package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.ProvaDetalhadaDTO;
import br.com.basis.sgp.servico.dto.ProvaRespostaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",uses = {QuestaoRespostaMapper.class})
public interface ProvaRespostaMapper extends EntityMapper<ProvaRespostaDTO, Prova>{
}
