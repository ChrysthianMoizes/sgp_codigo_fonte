package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface AvaliacaoListagemMapper extends EntityMapper<AvaliacaoListagemDTO, Avaliacao> {

    @Override
    @Mapping(source = "candidato.nome", target = "nomeCandidato")
    @Mapping(source = "prova.titulo", target = "tituloProva")
    AvaliacaoListagemDTO toDto(Avaliacao avaliacao);
}
