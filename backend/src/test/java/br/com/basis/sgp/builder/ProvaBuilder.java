package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.repositorio.ProvaRepositorio;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.mapper.ProvaListagemMapper;
import br.com.basis.sgp.servico.mapper.ProvaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class ProvaBuilder extends ConstrutorDeEntidade<Prova> {

    @Autowired
    private ProvaMapper provaMapper;

    @Autowired
    private ProvaListagemMapper provaListagemMapper;

    @Autowired
    private ProvaServico provaServico;

    @Autowired
    private ProvaRepositorio provaRepositorio;


    @Override
    public Prova construirEntidade() throws ParseException {

        Prova prova = new Prova();

        List<Questao> questoes = new ArrayList<>();

        Questao questao = new Questao();
        questao.setId(new Long("1"));
        questoes.add(questao);

        questao.setId(new Long("2"));
        questoes.add(questao);

        prova.setTitulo("Prova Senior");
        prova.setPercentual(new BigDecimal("90.00"));
        prova.setQuestoes(questoes);

        return prova;
    }

    @Override
    protected Prova persistir(Prova entidade) {
        return provaMapper.toEntity(provaServico.salvar(provaMapper.toDto(entidade)));
    }

    @Override
    public Collection<Prova> obterTodos() {
        return provaRepositorio.findAll();
    }

    @Override
    protected Prova obterPorId(Long id) {
        return provaMapper.toEntity(provaServico.exibirPorId(id));
    }

    public void excluirPorId(Long id) {
        provaServico.excluir(id);
    }

    public ProvaDTO construirProva() throws ParseException {
        return provaMapper.toDto(construirEntidade());
    }
}
