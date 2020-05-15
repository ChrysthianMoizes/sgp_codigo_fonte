package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.UsuarioEdicaoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface UsuarioEdicaoMapper extends EntityMapper<UsuarioEdicaoDTO, Usuario>{
}
