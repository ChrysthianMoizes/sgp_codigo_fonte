package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.repositorio.AvaliacaoRepositorio;
import br.com.basis.sgp.servico.AvalicaoServico;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
import br.com.basis.sgp.servico.mapper.AvaliacaoListagemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AvaliacaoServicoImpl implements AvalicaoServico {

    private final AvaliacaoListagemMapper avaliacaoMapper;
    private final AvaliacaoCadastroMapper avaliacaoCadastroMapper;
    private final AvaliacaoRepositorio avaliacaoRepositorio;

    @Override
    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO) {
        Avaliacao avaliacao = avaliacaoCadastroMapper.toEntity(avaliacaoCadastroDTO);

        return avaliacaoMapper.toDto(avaliacaoRepositorio.save(avaliacao));
    }

    @Override
    public List<AvaliacaoListagemDTO> listar() {
        //obter os dados do banco
        return avaliacaoMapper.toDto(avaliacaoRepositorio.findAll());
    }

    @Override
    public AvaliacaoCadastroDTO obterPorId(Long id) {
        return avaliacaoCadastroMapper.toDto(buscarPorId(id));
    }


    @Override
    public void excluir(Long id) {
        Avaliacao avaliacao = buscarPorId(id);
        avaliacaoRepositorio.delete(avaliacao);
    }

    private Avaliacao buscarPorId(Long id) {
        Avaliacao avaliacao = avaliacaoRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Avaliacao inválida"));

        return avaliacao;
    }

}
