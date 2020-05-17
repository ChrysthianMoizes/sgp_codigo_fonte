package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.enumeration.TipoUsuarioEnum;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.repositorio.UsuarioRepositorio;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;
import br.com.basis.sgp.servico.dto.UsuarioEdicaoDTO;
import br.com.basis.sgp.servico.dto.UsuarioListagemDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDropdownMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDetalhadoMapper;
import br.com.basis.sgp.servico.mapper.UsuarioEdicaoMapper;
import br.com.basis.sgp.servico.mapper.UsuarioListagemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    //Mappers
    private final UsuarioDetalhadoMapper usuarioDetalhadoMapper;
    private final UsuarioCadastroMapper usuarioCadastroMapper;
    private final UsuarioDropdownMapper usuarioDropdownMapper;
    private final UsuarioEdicaoMapper usuarioEdicaoMapper;
    private final UsuarioListagemMapper usuarioListagemMapper;

    //Repositorio
    private final UsuarioRepositorio usuarioRepositorio;

    //Tokens
    @Value("${app.TOKEN_ADMIN}")
    private String TOKEN_ADMIN;
    @Value("${app.TOKEN_USER}")
    private String TOKEN_USER;

    @Override
    public Page<UsuarioListagemDTO> listarCandidatos(@ModelAttribute UsuarioFiltro filtro, Pageable pageable) {
        filtro.setAdmin(TipoUsuarioEnum.CANDIDATO.getCodigo());
        Page<Usuario> usuarios = usuarioRepositorio.findAll(filtro.filter(), pageable);
        return usuarios.map(usuarioListagemMapper::toDto);
    }

    @Override
    public List<SelectDTO> listarCandidatosDropdown() {
        return usuarioDropdownMapper.toDto(usuarioRepositorio.findAllByAdmin(TipoUsuarioEnum.CANDIDATO.getCodigo()));
    }

    @Override
    public UsuarioDetalhadoDTO logar(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioRepositorio
                .findByEmailAndSenha(usuarioCadastroDTO.getEmail(), usuarioCadastroDTO.getSenha())
                .orElseThrow(() -> new RegraNegocioException("Usuário inexistente"));
        return usuarioDetalhadoMapper.toDto(usuario);
    }

    private void validarUsuario(Usuario usuario){
        if(verificarCpf(usuario)){
            throw new RegraNegocioException("CPF existente");
        }
        if(verificarEmail(usuario)){
            throw new RegraNegocioException("Email existente");
        }
    }
    @Override
    public UsuarioDetalhadoDTO salvar(UsuarioCadastroDTO usuarioCadastroDTO) {
        Usuario usuario = usuarioCadastroMapper.toEntity(usuarioCadastroDTO);

        UsuarioEdicaoDTO usuarioEdicaoDTO = usuarioEdicaoMapper.toDto(usuario);

        validarUsuario(usuario);

        usuario.setAdmin(validarToken(usuarioCadastroDTO));
        usuarioRepositorio.save(usuario);

        return usuarioDetalhadoMapper.toDto(usuario);
    }

    @Override
    public UsuarioDetalhadoDTO alterar(UsuarioEdicaoDTO usuarioEdicaoDTO) {
        Usuario usuario = preencherEdicao(usuarioEdicaoDTO);

        validarUsuario(usuario);

        usuario = usuarioRepositorio.save(usuario);

        return usuarioDetalhadoMapper.toDto(usuario);
    }

    @Override
    public UsuarioDetalhadoDTO obterPorId(Long id) {
        Usuario usuario = obterUsuario(id);
        return usuarioDetalhadoMapper.toDto(usuario);
    }

    private boolean verificarCpf(Usuario usuario) {
        Usuario usuarioBusca = usuarioRepositorio.findByCpf(usuario.getCpf());
        return !(usuarioBusca == null || usuarioBusca.getId().equals(usuario.getId()));
    }

    private boolean verificarEmail(Usuario usuario) {
        Usuario usuarioBusca = usuarioRepositorio.findByEmail(usuario.getEmail());
        return !(usuarioBusca == null || usuarioBusca.getId().equals(usuario.getId()));
    }

    private Integer validarToken(UsuarioCadastroDTO usuarioCadastroDTO) {
        if (TOKEN_ADMIN.equals(usuarioCadastroDTO.getToken())){
            return TipoUsuarioEnum.ADMIN.getCodigo();
        }else if(TOKEN_USER.equals(usuarioCadastroDTO.getToken())){
            return TipoUsuarioEnum.CANDIDATO.getCodigo();
        }else {
            throw new RegraNegocioException("Token inválido.");
        }
    }

    private Usuario obterUsuario(Long id) {
        Usuario usuario = usuarioRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Usuário inválido"));
        return usuario;
    }

    private Usuario preencherEdicao(UsuarioEdicaoDTO usuarioEdicaoDTO){
        Usuario usuario = obterUsuario(usuarioEdicaoDTO.getId());

        usuario.setNome(usuarioEdicaoDTO.getNome());
        usuario.setEmail(usuarioEdicaoDTO.getEmail());
        if(usuarioEdicaoDTO.getSenha() != null && !usuarioEdicaoDTO.getSenha().isEmpty()){
            usuario.setSenha(usuarioEdicaoDTO.getSenha());
        }

        return usuario;
    }
    @Override
    public void excluir(Long id) {
        Usuario usuario = obterUsuario(id);
        usuarioRepositorio.delete(usuario);
    }
}
