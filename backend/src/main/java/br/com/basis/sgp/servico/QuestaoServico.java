package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;

import java.util.List;


public interface QuestaoServico {

//    Page<QuestaoDTO> listarQuestoes(QuestaoFiltro questaoFiltro, Pageable pageable);

    List<SelectDTO> listarQuestoesDropdown();

    QuestaoDTO obterPorId(Long id);

    QuestaoDTO salvar(QuestaoDTO questaoDTO);

    void excluir(Long id);

}
