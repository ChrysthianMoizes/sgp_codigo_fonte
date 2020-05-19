package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.QuestaoRepositorio;
import br.com.basis.sgp.repositorio.SenioridadeRepositorio;
import br.com.basis.sgp.repositorio.TipoQuestaoRepositorio;
import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.SenioridadeServico;
import br.com.basis.sgp.servico.TipoQuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.mapper.QuestaoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Collection;
import java.util.Optional;

@Component
public class QuestaoBuilder extends ConstrutorDeEntidade<Questao>{

    @Autowired
    private QuestaoMapper questaoMapper;

    @Autowired
    private QuestaoServico questaoServico;

    @Autowired
    private QuestaoRepositorio questaoRepositorio;

    @Autowired
    private SenioridadeRepositorio senioridadeRepositorio;

    @Autowired
    private TipoQuestaoRepositorio tipoQuestaoRepositorio;

    @Autowired
    private SenioridadeServico senioridadeServico;

    @Autowired
    private TipoQuestaoServico tipoQuestaoServico;

    @Override
    public Questao construirEntidade() throws ParseException {

//        Senioridade senioridade = new Senioridade();
//        senioridade.setId(1L);
//        //senioridade.setDescricao("ESTAGIÁRIO");
//
//
//        TipoQuestao tipoQuestao = new TipoQuestao();
//        tipoQuestao.setId(1L);
//        //tipoQuestao.setDescricao("ARQUITETURA");

        Questao questao = new Questao();
        questao.setDescricao("Qual é a cor do cavalo branco de Napoleao?");
        questao.setAlternativa1("Branco");
        questao.setAlternativa2("Preto");
        questao.setAlternativa3("Azul");
        questao.setAlternativa4("Verde");
        questao.setAlternativa5("Rosa");
        questao.setResposta(1);
        questao.setSenioridade(senioridadeServico.findById(1L).get());
        questao.setTipoQuestao(tipoQuestaoServico.findById(1L).get());
        return questao;
    }

    @Override
    public Questao persistir(Questao entidade) {
        QuestaoDTO questaoDTO = questaoMapper.toDto(entidade);
        return questaoMapper.toEntity(questaoServico.salvar(questaoDTO));
    }

    @Override
    public Collection<Questao> obterTodos() {
        return questaoRepositorio.findAll();
    }

    public void excluirPorId(Long id) {
        questaoRepositorio.deleteById(id);
    }

    @Override
    public Questao obterPorId(Long id) { return questaoMapper.toEntity(questaoServico.obterPorId(id)); }

    public QuestaoDTO construirQuestao() throws ParseException {
        Questao questao = construirEntidade();
        QuestaoDTO questaoDTO = questaoMapper.toDto(questao);
        return questaoDTO;
    }




}
