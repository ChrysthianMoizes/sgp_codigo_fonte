package br.com.basis.sgp.recurso;

import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.UsuarioBuilder;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioEdicaoDTO;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.servico.mapper.UsuarioEdicaoMapper;
import br.com.basis.sgp.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.util.Collection;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SgpApplication.class)
@Transactional
public class UsuarioRecursoTest {

    private static final String API_USUARIO = "/api/usuarios/";

    private MockMvc mockMvc;

    @Autowired
    private UsuarioCadastroMapper usuarioCadastroMapper;

    @Autowired
    private UsuarioEdicaoMapper usuarioEdicaoMapper;

    @Autowired
    private UsuarioBuilder usuarioBuilder;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private void deletarDados() {
        Collection<Usuario> lista = usuarioBuilder.obterTodos();
        lista.forEach(aluno -> usuarioBuilder.excluirPorId(aluno.getId()));
    }

    @Before
    public void inicializarTeste() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        this.deletarDados();
        this.usuarioBuilder.setCustomizacao(null);
    }

    //Cadastrar Candidato com Sucesso
    @Test
    public void cadastrarUsuario() throws Exception {
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();

        mockMvc.perform(post(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isCreated());
    }

    //    Cadastrar Admin com Sucesso
    @Test
    public void cadastrarAdmin() throws Exception {
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirAdmin();

        mockMvc.perform(post(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isCreated());
    }

    //Não Cadastrar Usuario com CPF duplicado
    @Test
    public void cadastrarUsuarioCpfDuplicado() throws Exception {
        usuarioBuilder.customizar(entidade -> {
            entidade.setEmail("teste2@teste.com.br");
        }).construir();
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();

        mockMvc.perform(post(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isBadRequest());
    }

    //Não Cadastrar Usuario com Email Duplicado
    @Test
    public void cadastrarUsuarioEmailDuplicado() throws Exception {
        usuarioBuilder.customizar(entidade -> {
            entidade.setCpf("80233824030");
        }).construir();
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();

        mockMvc.perform(post(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isBadRequest());
    }

    //    Logar com dados corretos
    @Test
    public void logarComDadosCorretos() throws Exception {
        Usuario usuario = usuarioBuilder.construirEntidade();
        usuarioBuilder.persistir(usuario);

        mockMvc.perform(post(API_USUARIO + "login")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuario)))
                .andExpect(status().isOk());

    }

    //Não Logar com Senha Incorreta
    @Test
    public void logarComSenhaIncorreta() throws Exception {
        Usuario usuario = usuarioBuilder.construirEntidade();
        usuarioBuilder.persistir(usuario);
        usuario.setSenha("1234");

        mockMvc.perform(post(API_USUARIO + "login")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuario)))
                .andExpect(status().isBadRequest());

    }

    //Não Logar com Email Inexistente
    @Test
    public void logarComEmailInexistente() throws Exception {
        Usuario usuario = usuarioBuilder.construirEntidade();

        mockMvc.perform(post(API_USUARIO + "login")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuario)))
                .andExpect(status().isBadRequest());
    }

    //        Não Cadastrar Usuário com Token Inválido
    @Test
    public void cadastrarUsuarioComTokenInvalido() throws Exception {
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();
        usuarioCadastroDTO.setToken("tokeninvalido");
        mockMvc.perform(post(API_USUARIO + "login")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isBadRequest());
    }

    //    Editar Usuario Com Sucesso Sem mudar os Campos
    @Test
    public void editarUsuarioComSucesso() throws Exception {
        Usuario usuario = usuarioBuilder.construirEntidade();
        Usuario usuarioPersistido = usuarioBuilder.persistir(usuario);
        UsuarioEdicaoDTO usuarioEdicaoDTO = usuarioEdicaoMapper.toDto(usuarioPersistido);

        mockMvc.perform(put(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioEdicaoDTO)))
                .andExpect(status().isOk());

    }

    //    Editar Usuario Com Sucesso mudando o Campo Senha
    @Test
    public void editarUsuarioComSucessoMudandoSenha() throws Exception {
        Usuario usuario = usuarioBuilder.construirEntidade();

        Usuario usuarioPersistido = usuarioBuilder.persistir(usuario);
        UsuarioEdicaoDTO usuarioEdicaoDTO = usuarioEdicaoMapper.toDto(usuarioPersistido);
        usuarioEdicaoDTO.setSenha("batata");

        mockMvc.perform(put(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioEdicaoDTO)))
                .andExpect(status().isOk());

    }

    //   Falha ao editar email ja existente em outro usuario
    @Test
    public void editarUsuarioComEmailExistente() throws Exception {
        Usuario usuario = usuarioBuilder.construir();
        usuarioBuilder.customizar(entidade -> {
            entidade.setCpf("02886002070");
            entidade.setEmail("email1@email");
        }).construir();

        UsuarioEdicaoDTO usuarioEdicao = usuarioEdicaoMapper.toDto(usuario);
        usuarioEdicao.setEmail("email1@email");

        mockMvc.perform(put(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioEdicao)))
                .andExpect(status().isBadRequest());

    }

    //    Buscar todos os registros
    @Test
    public void buscarUsuariosComSucesso() throws Exception {
        mockMvc.perform(get(API_USUARIO))
                .andExpect(status().isOk());
    }

    //    Buscar por ID com sucesso
    @Test
    public void buscarPorIdComSucesso() throws Exception {
        Usuario usuario = usuarioBuilder.construir();
        Long id = usuario.getId();
        mockMvc.perform(get(API_USUARIO, id))
                .andExpect(status().isOk());
    }

    //    Não Retornar Usuario Inexistente
    @Test
    public void buscarUsuarioNaoExistente() throws Exception {
        Usuario usuario = usuarioBuilder.construir();
        long id = usuario.getId() + 100;
        mockMvc.perform(get(API_USUARIO + id))
                .andExpect(status().isBadRequest());
    }

    //    Deletar Usuario com Sucesso
    @Test
    public void deletarUsuarioComSucesso() throws Exception {
        Usuario usuario = usuarioBuilder.construir();
        Long id = usuario.getId();
        mockMvc.perform(delete(API_USUARIO + id))
                .andExpect(status().isOk());
    }

    //    Deletar Usuário Não Existente
    @Test
    public void deletarUsuarioNaoExistente() throws Exception {
        Usuario usuario = usuarioBuilder.construir();
        Long id = usuario.getId() + 100;
        mockMvc.perform(delete(API_USUARIO + id))
                .andExpect(status().isBadRequest());
    }

}
