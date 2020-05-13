package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;

import java.util.List;


public interface UsuarioServico {

    public List<UsuarioDTO> listar();

    public UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO);

    public void excluir(Long id);

    public List<UsuarioDTO> listarPorTipo(Integer admin);

    public List<UsuarioDTO> listarPorTipo(UsuarioFiltro admin);
}
