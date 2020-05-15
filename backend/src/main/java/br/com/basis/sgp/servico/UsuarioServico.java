package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface UsuarioServico {

    public Page<UsuarioDTO> listarCandidatos(UsuarioFiltro usuarioFiltro, Pageable pageable);

    public List<SelectDTO> listarCandidatosDropdown();

    public UsuarioDTO logar(UsuarioCadastroDTO usuarioCadastroDTO);

    public UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO);

    public UsuarioCadastroDTO obterPorId(Long id);

    public void excluir(Long id);

}
