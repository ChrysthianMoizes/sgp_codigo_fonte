package br.com.basis.sgp.servico;

import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;

import java.util.List;


public interface UsuarioServico {

    public List<UsuarioDTO> listar();

    public UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO);

    public void excluir(Long id);
}
