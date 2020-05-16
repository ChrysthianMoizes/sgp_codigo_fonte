package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ProvaListagemMapper extends EntityMapper<ProvaListagemDTO, Prova>{
}
