package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface AvaliacaoCadastroMapper extends EntityMapper<AvaliacaoCadastroDTO, Avaliacao> {

    @Override
    @Mapping(source = "idCandidato", target = "candidato.id")
    @Mapping(source = "idProva", target = "prova.id")
    Avaliacao toEntity(AvaliacaoCadastroDTO avaliacao);

    @Override
    @Mapping(source = "candidato.id", target = "idCandidato")
    @Mapping(source = "prova.id", target = "idProva")
    AvaliacaoCadastroDTO toDto(Avaliacao avaliacao);
}
