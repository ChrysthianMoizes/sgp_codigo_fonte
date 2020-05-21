package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.repositorio.QuestaoRepositorio;
import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.mapper.QuestaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
@RequiredArgsConstructor
public class QuestaoBuilder extends ConstrutorDeEntidade<Questao> {

    private final QuestaoRepositorio questaoRepositorio;
    private final QuestaoServico questaoServico;
    private final QuestaoMapper questaoMapper;

    @Override
    protected Questao construirEntidade() {
        Questao questao = new Questao();
        Senioridade senioridade = new Senioridade();
        TipoQuestao tipoQuestao = new TipoQuestao();

        senioridade.setId(1L);
        tipoQuestao.setId(1L);

        questao.setDescricao("Questão utópica");
        questao.setAlternativa1("Alternativa utópica 1");
        questao.setAlternativa2("Alternativa utópica 2");
        questao.setAlternativa3("Alternativa utópica 3");
        questao.setAlternativa4("Alternativa utópica 4");
        questao.setAlternativa5("Alternativa utópica 5");
        questao.setResposta(1);
        questao.setSenioridade(senioridade);
        questao.setTipoQuestao(tipoQuestao);

        return questao;
    }

    @Override
    protected Questao persistir(Questao entidade) {
        return questaoMapper.toEntity(questaoServico.salvar(questaoMapper.toDto(entidade)));
    }

    @Override
    public Collection<Questao> obterTodos() {
        return questaoRepositorio.findAll();
    }

    @Override
    protected Questao obterPorId(Long id) {
        return questaoMapper.toEntity(questaoServico.obterPorId(id));
    }

    public void excluirPorId(Long id) {
        questaoRepositorio.deleteById(id);
    }

    public QuestaoDTO construirQuestao() {
        Questao questao = construirEntidade();
        return questaoMapper.toDto(questao);
    }

}
