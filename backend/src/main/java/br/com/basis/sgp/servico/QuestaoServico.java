package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.filtro.QuestaoFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface QuestaoServico {

    Page<QuestaoListagemDTO> listarQuestoes(QuestaoFiltro questaoFiltro, Pageable pageable);

    List<SelectDTO> listarQuestoesDropdown();

    QuestaoDTO obterPorId(Long id);

    QuestaoDTO salvar(QuestaoDTO questaoDTO);

    void excluir(Long id);
}
