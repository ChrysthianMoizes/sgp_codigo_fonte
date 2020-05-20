package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.*;
import br.com.basis.sgp.servico.filtro.ProvaFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProvaServico {

    public Page<ProvaListagemDTO> listarProvas(ProvaFiltro provaFiltro, Pageable pageable);

    public ProvaDTO exibirPorId(Long id);

    public ProvaListagemDTO buscarPorTitulo(String titulo);

    public ProvaDTO salvar(ProvaDTO provaDTO);

    public List<SelectDTO> filtrarAutocomplete(String query);

    public void excluir(Long id);

    public ProvaDetalhadaDTO exibirProvaDetalhada(Long id);

    public ProvaRespostaDTO buscarRespostas(Long id);

    public List<SelectDTO> listarProvaDropDown();

}
