package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface AvaliacaoListagemMapper extends EntityMapper<AvaliacaoListagemDTO, Avaliacao> {

    @Override
    @Mapping(source = "candidato.nome", target = "nomeCandidato")
    @Mapping(source = "candidato.id", target = "idCandidato")
    @Mapping(source = "prova.titulo", target = "tituloProva")
    @Mapping(source = "prova.id", target = "idProva")
    AvaliacaoListagemDTO toDto(Avaliacao avaliacao);
}
