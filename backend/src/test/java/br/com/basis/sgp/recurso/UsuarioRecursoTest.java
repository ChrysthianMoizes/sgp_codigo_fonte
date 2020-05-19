package br.com.basis.sgp.recurso;

import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.UsuarioBuilder;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    private UsuarioBuilder usuarioBuilder;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private void deletaDados() {
        Collection<Usuario> lista = usuarioBuilder.obterTodos();
        lista.forEach(aluno -> usuarioBuilder.excluirPorId(aluno.getId()));
    }

    @Before
    public void inicializaTeste() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        this.deletaDados();
        this.usuarioBuilder.setCustomizacao(null);
    }

    @Test
    public void cadastrarUsuario() throws Exception {
        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();

        mockMvc.perform(post(API_USUARIO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
                .andExpect(status().isCreated());
    }

//    @Test
//    public void cadastrarUsuarioCpfDuplicado() throws Exception {
//        usuarioBuilder.customizar(entidade -> {
//            entidade.setEmail("teste2@teste.com.br");
//        }).construir();
//        UsuarioCadastroDTO usuarioCadastroDTO = usuarioBuilder.construirUsuario();
//
//        mockMvc.perform(post(API_USUARIO)
//                .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                .content(TestUtil.convertObjectToJsonBytes(usuarioCadastroDTO)))
//                .andExpect(status().isBadRequest());
//    }

}
