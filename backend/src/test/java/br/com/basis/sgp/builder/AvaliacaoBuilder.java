package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;
import br.com.basis.sgp.servico.AvaliacaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoPreenchidaDTO;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class AvaliacaoBuilder extends ConstrutorDeEntidade<Avaliacao>{

    @Autowired
    private AvaliacaoCadastroMapper avaliacaoCadastroMapper;

    @Autowired
    private AvaliacaoListagemMapper avaliacaoListagemMapper;

    @Autowired
    private ProvaRespostaMapper provaRespostaMapper;

    @Autowired
    private AvaliacaoServico avaliacaoServico;

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ProvaServico provaServico;

    @Autowired
    private ProvaBuilder provaBuilder;

    @Autowired
    private QuestaoBuilder questaoBuilder;

    @Autowired
    private UsuarioBuilder usuarioBuilder;

    @Autowired
    private AvaliacaoRepositorio avaliacaoRepositorio;


    @Override
    public Avaliacao construirEntidade() throws ParseException {
        Avaliacao avaliacao = new Avaliacao();

        Prova prova = provaBuilder.construir();
        Usuario candidato = usuarioBuilder.construir();
        avaliacao.setData(LocalDate.parse("2020-06-20"));
        avaliacao.setCandidato(candidato);
        avaliacao.setProva(prova);

        return avaliacao;
    }

    public AvaliacaoPreenchidaDTO construirEntidadePreenchida() throws ParseException{
        Avaliacao avaliacao = construir();
        AvaliacaoPreenchidaDTO avaliacaoPreenchidaDTO = new AvaliacaoPreenchidaDTO();
        avaliacaoPreenchidaDTO.setId(avaliacao.getId());
        avaliacaoPreenchidaDTO.setIdProva(avaliacao.getProva().getId());
        List<Long> listaRespostas = new ArrayList<>();
        listaRespostas.add(1L);
        listaRespostas.add(1L);
        avaliacaoPreenchidaDTO.setRespostas(listaRespostas);

        return avaliacaoPreenchidaDTO;
    }

    @Override
    public Avaliacao persistir(Avaliacao entidade) {
        AvaliacaoCadastroDTO avaliacaoCadastroDTO = avaliacaoCadastroMapper.toDto(entidade);

        return avaliacaoListagemMapper.toEntity(avaliacaoServico.salvar(avaliacaoCadastroDTO));
    }

    @Override
    public Collection<Avaliacao> obterTodos() {
        return avaliacaoRepositorio.findAll();
    }

    @Override
    protected Avaliacao obterPorId(Long id) {
        return avaliacaoCadastroMapper.toEntity(avaliacaoServico.obterPorId(id));
    }

    public void excluirPorId(Long id) {
        avaliacaoRepositorio.deleteById(id);
    }


    public AvaliacaoCadastroDTO construirAvaliacao() throws ParseException {
        Avaliacao avaliacao = construirEntidade();
        AvaliacaoCadastroDTO avaliacaoCadastroDTO = avaliacaoCadastroMapper.toDto(avaliacao);

        return avaliacaoCadastroDTO;
    }
}
