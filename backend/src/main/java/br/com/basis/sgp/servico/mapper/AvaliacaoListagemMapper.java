package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AvaliacaoListagemMapper extends EntityMapper<AvaliacaoListagemDTO, Avaliacao> {

    @Override
    @Mapping(target = "nomeCandidato", source = "candidato.nome")
    @Mapping(target = "tituloProva", source = "prova.titulo")
    AvaliacaoListagemDTO toDto(Avaliacao avaliacao);
}
