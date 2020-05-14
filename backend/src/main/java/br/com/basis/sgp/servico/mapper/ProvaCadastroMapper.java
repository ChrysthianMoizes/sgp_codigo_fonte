package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.servico.dto.ProvaCadastroDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {})
public interface ProvaCadastroMapper extends EntityMapper<ProvaCadastroDTO, Prova>{
}
