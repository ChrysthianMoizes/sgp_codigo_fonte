package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.repositorio.QuestaoRepositorio;
import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.QuestaoFiltro;
import br.com.basis.sgp.servico.mapper.QuestaoDropdownMapper;
import br.com.basis.sgp.servico.mapper.QuestaoListagemMapper;
import br.com.basis.sgp.servico.mapper.QuestaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestaoServicoImpl implements QuestaoServico {

    private final QuestaoMapper questaoMapper;
    private final QuestaoDropdownMapper questaoDropdownMapper;
    private final QuestaoListagemMapper questaoListagemMapper;

    private final QuestaoRepositorio questaoRepositorio;

    @Override
    public Page<QuestaoListagemDTO> listarQuestoes(QuestaoFiltro questaoFiltro, Pageable pageable) {
        return questaoRepositorio.findAll(questaoFiltro.filter(), pageable)
                .map(questaoListagemMapper::toDto);
    }

    @Override
    public List<SelectDTO> listarQuestoesDropdown() {
        return questaoDropdownMapper.toDto(questaoRepositorio.findAll());
    }

    @Override
    public QuestaoDTO salvar(QuestaoDTO questaoDTO) {
        Questao questao = questaoMapper.toEntity(questaoDTO);
        return questaoMapper.toDto(questaoRepositorio.save(questao));
    }

    @Override
    public QuestaoDTO obterPorId(Long id) {
        return questaoMapper.toDto(obterQuestao(id));
    }

    @Override
    public void excluir(Long id) {
        Questao questao = obterQuestao(id);
        questaoRepositorio.delete(questao);
    }

    private Questao obterQuestao(Long id) {
        return questaoRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Questao inválida"));

    }
}
