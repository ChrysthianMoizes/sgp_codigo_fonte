package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.filtro.AvaliacaoFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface AvalicaoServico {

//    public Page<AvaliacaoListagemDTO> listarCandidatos(AvaliacaoFiltro usuarioFiltro, Pageable pageable);

    public AvaliacaoListagemDTO salvar(AvaliacaoCadastroDTO avaliacaoCadastroDTO);

    public Page<AvaliacaoListagemDTO> listar(AvaliacaoFiltro avaliacaoFiltro, Pageable pageable);

    public AvaliacaoCadastroDTO obterPorId(Long id);

    public void excluir(Long id);

}
