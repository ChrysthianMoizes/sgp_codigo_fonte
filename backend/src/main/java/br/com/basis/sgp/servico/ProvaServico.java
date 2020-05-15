package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProvaServico {

    public Page<ProvaListagemDTO> listarProvas(Pageable pageable);

    public ProvaDTO exibirPorID(Long id);

    public ProvaDTO salvar(ProvaDTO provaDTO);

    public void excluir(Long id);

    public List<SelectDTO> listarProvaDropDown();

}