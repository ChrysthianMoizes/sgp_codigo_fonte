package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface UsuarioServico {

    Page<UsuarioDTO> listarCandidatos(UsuarioFiltro usuarioFiltro, Pageable pageable);

    List<SelectDTO> listarCandidatosDropdown();

    UsuarioDTO logar(UsuarioCadastroDTO usuarioCadastroDTO);

    UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO);

    UsuarioCadastroDTO obterPorId(Long id);

    void excluir(Long id);

}
