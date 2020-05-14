package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface QuestaoListagemMapper extends EntityMapper<QuestaoListagemDTO, Questao> {

    @Override
    @Mapping(source = "senioridade.descricao", target = "descricaoSenioridade")
    @Mapping(source = "tipoQuestao.descricao", target = "descricaoTipo")
    QuestaoListagemDTO toDto(Questao entity);

}
