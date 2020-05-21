package br.com.basis.sgp.servico;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;
import br.com.basis.sgp.servico.dto.UsuarioEdicaoDTO;
import br.com.basis.sgp.servico.dto.UsuarioListagemDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface UsuarioServico {

    public Page<UsuarioListagemDTO> listarCandidatos(UsuarioFiltro usuarioFiltro, Pageable pageable);

    public List<SelectDTO> listarCandidatosDropdown();

    public List<SelectDTO> filtrarAutocomplete(String query);

    public UsuarioDetalhadoDTO logar(UsuarioCadastroDTO usuarioCadastroDTO);

    public UsuarioDetalhadoDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO);

    public UsuarioDetalhadoDTO alterar(UsuarioEdicaoDTO usuarioEdicaoDTO);

    public UsuarioDetalhadoDTO obterPorId(Long id);

    public void excluir(Long id);

    Optional<Usuario> findById(long l);
}
