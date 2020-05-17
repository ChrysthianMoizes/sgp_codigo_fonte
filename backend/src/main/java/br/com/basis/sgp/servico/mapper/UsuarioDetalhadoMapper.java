package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface UsuarioDetalhadoMapper extends EntityMapper<UsuarioDetalhadoDTO, Usuario> {

}
