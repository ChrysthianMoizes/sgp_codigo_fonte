package br.com.basis.sgp.recurso;

import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.ProvaBuilder;
import br.com.basis.sgp.builder.UsuarioBuilder;
import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.mapper.ProvaMapper;
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
public class ProvaRecursoTest {

    private static final String API_PROVA = "/api/provas/";

    private MockMvc mockMvc;

    @Autowired
    private ProvaMapper provaMapper;

    @Autowired
    private ProvaBuilder provaBuilder;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private void deletaDados() {
        Collection<Prova> lista = provaBuilder.obterTodos();
        lista.forEach(prova -> provaBuilder.excluirPorId(prova.getId()));
    }

    @Before
    public void inicializaTeste() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        this.deletaDados();
        this.provaBuilder.setCustomizacao(null);
    }

    @Test
    public void cadastrarProva() throws Exception {
        ProvaDTO provaDTO = provaBuilder.construirProva();

        mockMvc.perform(post(API_PROVA)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(provaDTO)))
                .andExpect(status().isCreated());
    }

}
