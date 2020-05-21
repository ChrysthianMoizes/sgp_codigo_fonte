package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;
<<<<<<< HEAD
import br.com.basis.sgp.servico.AvaliacaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.dto.ProvaDTO;

import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;
=======
import br.com.basis.sgp.servico.AvalicaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.*;
>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.AvaliacaoFiltro;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
import br.com.basis.sgp.servico.mapper.AvaliacaoListagemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
<<<<<<< HEAD
=======
import java.math.BigDecimal;
import java.util.concurrent.atomic.AtomicInteger;
>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d

@Service
@Transactional
@RequiredArgsConstructor
public class AvaliacaoServicoImpl implements AvaliacaoServico {

    private final AvaliacaoListagemMapper avaliacaoMapper;
    private final AvaliacaoCadastroMapper avaliacaoCadastroMapper;
    private final AvaliacaoRepositorio avaliacaoRepositorio;
    private final UsuarioServico usuarioServico;
    private final ProvaServico provaServico;

    private final ProvaServico provaServico;

    @Override
    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO) {

        Avaliacao avaliacao = avaliacaoCadastroMapper.toEntity(avaliacaoCadastroDTO);
        UsuarioDetalhadoDTO candidato = usuarioServico.obterPorId(avaliacaoCadastroDTO.getIdCandidato());
        avaliacao.getCandidato().setNome(candidato.getNome());

        ProvaDTO prova = provaServico.exibirPorId(avaliacaoCadastroDTO.getIdProva());
        avaliacao.getProva().setTitulo(prova.getTitulo());

        return avaliacaoMapper.toDto(avaliacaoRepositorio.save(avaliacao));
    }

    @Override
    public Page<AvaliacaoListagemDTO> listar(AvaliacaoFiltro filtro, Pageable pageable) {
        Page<Avaliacao> avaliacoes = avaliacaoRepositorio.findAll(filtro.filter(), pageable);
        return avaliacoes.map(avaliacaoMapper::toDto);
    }

    @Override
    public AvaliacaoCadastroDTO obterPorId(Long id) {
        return avaliacaoCadastroMapper.toDto(buscarPorId(id));
    }

    @Override
    public void excluir(Long id) {
        Avaliacao avaliacao = buscarPorId(id);

        if(!(avaliacao.getAproveitamento() == null)){
            throw new RegraNegocioException("Avaliação tem aproveitamento cadastrado.");
        }
        avaliacaoRepositorio.deleteById(id);

        avaliacaoRepositorio.delete(avaliacao);

    }

    @Override
    public void realizarAvaliacao(AvaliacaoPreenchidaDTO avaliacaoPreenchidaDTO) {

        ProvaRespostaDTO prova = provaServico.buscarRespostas(avaliacaoPreenchidaDTO.getId());
        Long acertos = verificarAcertos(avaliacaoPreenchidaDTO, prova);

        Avaliacao avaliacao = buscarPorId(avaliacaoPreenchidaDTO.getId());
        avaliacao.setAproveitamento(toAproveitamento(acertos, prova));

        avaliacaoRepositorio.save(avaliacao);
    }

    private BigDecimal toAproveitamento(Long acertos, ProvaRespostaDTO prova){
        return BigDecimal.valueOf(prova.getQuestoes().size() / acertos);
    }

    private Long verificarAcertos(AvaliacaoPreenchidaDTO avaliacao, ProvaRespostaDTO prova) {
        AtomicInteger acertos = new AtomicInteger();
        prova.getQuestoes().forEach( element -> {
            int pos = avaliacao.getRespostas().indexOf(element.getId());
            if(element.getResposta().equals(avaliacao.getRespostas().get(pos))){
                acertos.getAndIncrement();
            }
        });
        return Long.valueOf(acertos.get());
    }

    private Avaliacao buscarPorId(Long id) {
        return avaliacaoRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Avaliacao inválida"));
<<<<<<< HEAD
        return avaliacao;
=======
>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d
    }

}
