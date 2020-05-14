package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.repositorio.QuestaoRepository;
import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.mapper.QuestaoListagemMapper;
import br.com.basis.sgp.servico.mapper.QuestaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestaoServicoImpl implements QuestaoServico {

    private final QuestaoRepository repositorio;

    private final QuestaoMapper questaoMapper;
    private final QuestaoListagemMapper questaoListagemMapper;

    @Override
    public QuestaoDTO salvar(QuestaoDTO questao) {
        return questaoMapper.toDto(repositorio.save(questaoMapper.toEntity(questao)));
    }

    @Override
    public QuestaoDTO obterPorId(Long id) {
        return questaoMapper.toDto(buscarQuestao(id));
    }

    @Override
    public void excluir(Long id) {
        repositorio.delete(buscarQuestao(id));
    }

    @Override
    public List<QuestaoListagemDTO> listar() {
        return questaoListagemMapper.toDto(repositorio.findAll());
    }

    private Questao buscarQuestao(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Usuário inexistente"));
    }
}
