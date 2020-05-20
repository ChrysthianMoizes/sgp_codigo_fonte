package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.ProvaDetalhadaDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.filtro.ProvaFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProvaServico {

    public Page<ProvaListagemDTO> listarProvas(ProvaFiltro provaFiltro,Pageable pageable);

    public ProvaDTO exibirPorId(Long id);

    public ProvaDetalhadaDTO exiberProvaDetalhada(Long id);

    public ProvaDTO salvar(ProvaDTO provaDTO);

    public void excluir(Long id);

    public List<SelectDTO> listarProvaDropDown();

}
