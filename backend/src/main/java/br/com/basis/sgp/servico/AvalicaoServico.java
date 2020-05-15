package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;

import java.util.List;


public interface AvalicaoServico {

//    public Page<AvaliacaoListagemDTO> listarCandidatos(AvaliacaoFiltro usuarioFiltro, Pageable pageable);

    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO);

    public List<AvaliacaoListagemDTO> listar();

    public AvaliacaoCadastroDTO obterPorId(Long id);

    public void excluir(Long id);

}
