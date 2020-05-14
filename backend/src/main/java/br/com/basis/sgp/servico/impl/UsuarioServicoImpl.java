package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repository.UsuarioRepository;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.servico.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UsuarioServicoImpl implements UsuarioServico {

    private final UsuarioMapper usuarioMapper;
    private final UsuarioCadastroMapper usuarioCadastroMapper;
    private final UsuarioRepository usuarioRepository;

    @Override
    public List<UsuarioDTO> listar() {
        return usuarioMapper.toDto(usuarioRepository.findAll());
    }

    @Override
    public List<UsuarioDTO> listarPorTipo(Integer admin) {
        return usuarioMapper.toDto(usuarioRepository.findByAdmin(admin));
    }

    @Override
    public List<UsuarioDTO> listarPorTipo(UsuarioFiltro admin) {
        return usuarioMapper.toDto(usuarioRepository.findAll(admin.filter()));
    }

    @Override
    public UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioCadastroMapper.toEntity(usuarioCadastroDTO);
        // salvar o registro no banco -> repositorio
        return usuarioMapper.toDto(usuario);
    }

    @Override
    public void excluir(Long id) {
        // verifica se o registro existe no banco -> repositorio
        // remove o registro
    }
}
