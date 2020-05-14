package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.enumeration.TipoUsuarioEnum;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.UsuarioRepositorio;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDropdownMapper;
import br.com.basis.sgp.servico.mapper.UsuarioMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UsuarioServicoImpl implements UsuarioServico {

    private final UsuarioMapper usuarioMapper;
    private final UsuarioCadastroMapper usuarioCadastroMapper;
    private final UsuarioRepositorio usuarioRepositorio;
    private final UsuarioDropdownMapper usuarioDropdownMapper;

    private static final String TOKEN_ADMIN = "pindaiba";
    private static final String TOKEN_USER = "abacate";

    @Override
    public Page<UsuarioDTO> listarCandidatos(@ModelAttribute UsuarioFiltro filtro, Pageable pageable) {
        filtro.setAdmin(TipoUsuarioEnum.CANDIDATO.getCodigo());
        Page<Usuario> usuarios = usuarioRepositorio.findAll(filtro.filter(), pageable);
        return usuarios.map(usuarioMapper::toDto);
    }

    @Override
    public List<SelectDTO> listarCandidatosDropdown() {
        return usuarioDropdownMapper.toDto(usuarioRepositorio.findAllByAdmin(TipoUsuarioEnum.CANDIDATO.getCodigo()));
    }

    @Override
    public UsuarioDTO logar(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioRepositorio
                .findByEmailAndSenha(usuarioCadastroDTO.getEmail(), usuarioCadastroDTO.getSenha())
                .orElseThrow(() -> new RegraNegocioException("Usuário inexistente"));
        return usuarioMapper.toDto(usuario);
    }

    @Override
    public UsuarioDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioCadastroMapper.toEntity(usuarioCadastroDTO);

        if(verificarCpf(usuarioCadastroDTO)){
            throw new RegraNegocioException("CPF existente");
        }

        if(verificarEmail(usuarioCadastroDTO)){
            throw new RegraNegocioException("Email existente");
        }

        usuario.setAdmin(validarToken(usuarioCadastroDTO));
        usuarioRepositorio.save(usuario);

        return usuarioMapper.toDto(usuario);
    }

    @Override
    public UsuarioCadastroDTO obterPorId(Long id) {
        Usuario usuario = obterUsuario(id);
        return usuarioCadastroMapper.toDto(usuario);
    }

    private boolean verificarCpf(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioRepositorio.findByCpf(usuarioCadastroDTO.getCpf());
        return !(usuario == null || usuario.getId().equals(usuarioCadastroDTO.getId()));
    }

    private boolean verificarEmail(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioRepositorio.findByEmail(usuarioCadastroDTO.getEmail());
        return !(usuario == null || usuario.getId().equals(usuarioCadastroDTO.getId()));
    }

    private Integer validarToken(UsuarioCadastroDTO usuarioCadastroDTO) {
        switch (usuarioCadastroDTO.getToken()){
            case TOKEN_ADMIN:
                return TipoUsuarioEnum.ADMIN.getCodigo();
            case TOKEN_USER:
                return TipoUsuarioEnum.CANDIDATO.getCodigo();
            default:
                throw new RegraNegocioException("Token inválido");
        }
    }

    private Usuario obterUsuario(Long id) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Usuário inválido"));
        return usuario;
    }

    @Override
    public void excluir(Long id) {
        Usuario usuario = obterUsuario(id);
        usuarioRepositorio.delete(usuario);
    }
}
