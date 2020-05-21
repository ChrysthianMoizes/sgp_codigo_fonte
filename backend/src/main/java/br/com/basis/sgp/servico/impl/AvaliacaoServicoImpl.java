package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;

import br.com.basis.sgp.servico.AvaliacaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.dto.ProvaDTO;

import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;

import br.com.basis.sgp.servico.dto.*;

import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.AvaliacaoFiltro;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
import br.com.basis.sgp.servico.mapper.AvaliacaoListagemMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDetalhadoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;


@Service
@Transactional
@RequiredArgsConstructor
public class AvaliacaoServicoImpl implements AvaliacaoServico {

    private final AvaliacaoListagemMapper avaliacaoMapper;
    private final AvaliacaoCadastroMapper avaliacaoCadastroMapper;
    private final UsuarioDetalhadoMapper usuarioDetalhadoMapper;
    private final AvaliacaoRepositorio avaliacaoRepositorio;
    private final UsuarioServico usuarioServico;
    private final ProvaServico provaServico;

    @Override
    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO) {

        Avaliacao avaliacao = avaliacaoCadastroMapper.toEntity(avaliacaoCadastroDTO);
        UsuarioDetalhadoDTO candidato = usuarioServico.obterPorId(avaliacaoCadastroDTO.getIdCandidato());
        avaliacao.getCandidato().setNome(candidato.getNome());

        ProvaDTO prova = provaServico.exibirPorId(avaliacaoCadastroDTO.getIdProva());
        avaliacao.getProva().setTitulo(prova.getTitulo());

        if(!(avaliacao.getAproveitamento() == null)){
            throw new RegraNegocioException("Avaliação não pode ser cadastrada com aproveitamento.");
        }

        if(avaliacao.getData().isBefore(LocalDate.now())){
            throw new RegraNegocioException("Avaliação não pode ser cadastrada com data inferior ao dia atual.");
        }

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
    }

    @Override
    public void realizarAvaliacao(AvaliacaoPreenchidaDTO avaliacaoPreenchidaDTO) {

        ProvaRespostaDTO prova = provaServico.buscarRespostas(avaliacaoPreenchidaDTO.getIdProva());
        Avaliacao avaliacao = buscarPorId(avaliacaoPreenchidaDTO.getId());
        verificarAcertos(avaliacaoPreenchidaDTO, prova, avaliacao);

        avaliacaoRepositorio.save(avaliacao);
    }

    private BigDecimal toAproveitamento(Long acertos, ProvaRespostaDTO prova){
        return BigDecimal.valueOf(prova.getQuestoes().size() / acertos);
    }

    private void verificarAcertos(AvaliacaoPreenchidaDTO avaliacaoDTO, ProvaRespostaDTO prova, Avaliacao avaliacao) {
        avaliacao.setAproveitamento(BigDecimal.valueOf(0));
        prova.getQuestoes().forEach( element -> {
            int pos = prova.getQuestoes().indexOf(element);
            if(element.getResposta().equals(avaliacaoDTO.getRespostas().get(pos))){
                avaliacao.setAproveitamento(avaliacao.getAproveitamento().add(BigDecimal.valueOf(100 / avaliacaoDTO.getRespostas().size())));
            }
        });
    }

    private Avaliacao buscarPorId(Long id) {
        return avaliacaoRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Avaliacao inválida"));

    }

}
