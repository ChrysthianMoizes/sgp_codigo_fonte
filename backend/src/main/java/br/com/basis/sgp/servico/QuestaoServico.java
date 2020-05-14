package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;

import java.util.List;

public interface QuestaoServico {

    QuestaoDTO salvar(QuestaoDTO prova);

    QuestaoDTO obterPorId(Long id);

    void excluir(Long id);

    List<QuestaoListagemDTO> listar();

}
