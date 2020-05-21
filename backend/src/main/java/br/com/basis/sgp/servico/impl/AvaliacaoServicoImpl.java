package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.enumeration.TipoUsuarioEnum;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;
import br.com.basis.sgp.servico.AvalicaoServico;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.*;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.AvaliacaoFiltro;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
import br.com.basis.sgp.servico.mapper.AvaliacaoListagemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Transactional
@RequiredArgsConstructor
public class AvaliacaoServicoImpl implements AvalicaoServico {

    private final AvaliacaoListagemMapper avaliacaoMapper;
    private final AvaliacaoCadastroMapper avaliacaoCadastroMapper;
    private final AvaliacaoRepositorio avaliacaoRepositorio;
    private final UsuarioServico usuarioServico;
    private final ProvaServico provaServico;

    @Override
    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO) {
        validarCandidato(avaliacaoCadastroDTO);
        Avaliacao avaliacao = avaliacaoCadastroMapper.toEntity(avaliacaoCadastroDTO);

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
        verificarAproveitamento(avaliacao);
        avaliacaoRepositorio.delete(avaliacao);
    }

    @Override
    public void realizarAvaliacao(AvaliacaoPreenchidaDTO avaliacaoPreenchidaDTO) {

        ProvaRespostaDTO prova = provaServico.buscarRespostas(avaliacaoPreenchidaDTO.getId());
        Avaliacao avaliacao = buscarPorId(avaliacaoPreenchidaDTO.getId());
        verificarAcertos(avaliacaoPreenchidaDTO, prova, avaliacao);

        avaliacaoRepositorio.save(avaliacao);
    }

    private BigDecimal toAproveitamento(Long acertos, ProvaRespostaDTO prova){
        return BigDecimal.valueOf(prova.getQuestoes().size() / acertos);
    }

    private void verificarAcertos(AvaliacaoPreenchidaDTO avaliacaoDTO, ProvaRespostaDTO prova, Avaliacao avaliacao) {
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

    private void verificarAproveitamento(Avaliacao avaliacao) {
        if(avaliacao.getAproveitamento() != null){
            throw new RegraNegocioException("Avaliação não pode ser excluída");
        }
    }

    private void validarCandidato(AvaliacaoCadastroDTO avaliacao) {
        UsuarioDetalhadoDTO usuario = usuarioServico.obterPorId(avaliacao.getIdCandidato());
        if(TipoUsuarioEnum.ADMIN.getCodigo().equals(usuario.getAdmin())){
            throw new RegraNegocioException("Usuario é um administrador");
        }
    }

}
