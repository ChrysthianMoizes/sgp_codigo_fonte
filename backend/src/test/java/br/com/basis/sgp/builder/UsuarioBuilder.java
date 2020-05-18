package br.com.basis.sgp.builder;

import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.dominio.enumeration.TipoUsuarioEnum;
import br.com.basis.sgp.repositorio.UsuarioRepositorio;
import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDetalhadoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Collection;

@Component
public class UsuarioBuilder extends ConstrutorDeEntidade<Usuario> {

    @Autowired
    private UsuarioCadastroMapper usuarioCadastroMapper;

    @Autowired
    private UsuarioDetalhadoMapper usuarioDetalhadoMapper;

    @Autowired
    private UsuarioServico usuarioServico;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Value("${app.TOKEN_USER}")
    private String TOKEN;

    @Override
    public Usuario construirEntidade() throws ParseException {

        Usuario usuario = new Usuario();

        usuario.setEmail("teste@teste.com.br");
        usuario.setNome("José da Silva");
        usuario.setCpf("60600208010");
        usuario.setSenha("12345");
        usuario.setAdmin(TipoUsuarioEnum.CANDIDATO.getCodigo());

        return usuario;
    }

    @Override
    public Usuario persistir(Usuario entidade) {
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioCadastroMapper.toDto(entidade);
        usuarioCadastroDTO.setToken(TOKEN);
        return usuarioDetalhadoMapper.toEntity(usuarioServico.salvar(usuarioCadastroDTO));
    }

    @Override
    public Collection<Usuario> obterTodos() {
        return usuarioRepositorio.findAll();
    }

    @Override
    protected Usuario obterPorId(Long id) {
        return usuarioDetalhadoMapper.toEntity(usuarioServico.obterPorId(id));
    }

    public void excluirPorId(Long id) {
        usuarioRepositorio.deleteById(id);
    }

    public UsuarioCadastroDTO construirUsuario() throws ParseException {
        Usuario usuario = construirEntidade();
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioCadastroMapper.toDto(usuario);
        usuarioCadastroDTO.setToken(TOKEN);

        return usuarioCadastroDTO;
    }
}
