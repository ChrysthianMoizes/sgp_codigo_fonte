package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;
import br.com.basis.sgp.servico.AvaliacaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
import br.com.basis.sgp.servico.mapper.AvaliacaoListagemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;

@Component
public class AvaliacaoBuilder extends ConstrutorDeEntidade<Avaliacao>{

    @Autowired
    private AvaliacaoCadastroMapper avaliacaoCadastroMapper;

    @Autowired
    private AvaliacaoListagemMapper avaliacaoListagemMapper;

    @Autowired
    private AvaliacaoServico avaliacaoServico;

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private ProvaServico provaServico;

    @Autowired
    private AvaliacaoRepositorio avaliacaoRepositorio;

    @Override
    public Avaliacao construirEntidade() throws ParseException {
        Avaliacao avaliacao = new Avaliacao();

        //chamar o builder do usuario e prova
        avaliacao.setData(LocalDate.parse("2020-05-20"));
        avaliacao.setCandidato(usuarioServico.findById(1L).get());
        avaliacao.setProva(provaServico.findById(1L).get());

        return avaliacao;
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
