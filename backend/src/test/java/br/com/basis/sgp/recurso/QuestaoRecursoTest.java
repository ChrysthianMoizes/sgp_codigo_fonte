package br.com.basis.sgp.recurso;

import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.QuestaoBuilder;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SgpApplication.class)
@Transactional
public class QuestaoRecursoTest {

    private static final String API_QUESTAO = "/api/questoes/";

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private QuestaoBuilder questaoBuilder;

    private void limparBD() {
        Collection<Questao> questoes = questaoBuilder.obterTodos();
        questoes.forEach(questao -> questaoBuilder.excluirPorId(questao.getId()));
    }

    @Before
    public void inicializaTeste() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        limparBD();
        questaoBuilder.setCustomizacao(null);
    }

    @Test
    public void questaoSalvar() throws Exception {
        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();
        mockMvc.perform(post(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questaoDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    public void questaoSalvarSenioridadeInvalida() throws Exception {
        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();
        questaoDTO.setIdSenioridade(-5L);
        mockMvc.perform(post(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questaoDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void questaoSalvarTipoQuestaoInvalido() throws Exception {
        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();
        questaoDTO.setIdTipoQuestao(-5L);
        mockMvc.perform(post(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questaoDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void questaoAlterar() throws Exception {
        Questao questao = questaoBuilder.construir();
        questaoBuilder.customizar(entidade -> entidade.setId(questao.getId()));
        questaoBuilder.customizar(entidade -> entidade.setDescricao("Questão utópica alterada"));

        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();
        mockMvc.perform(put(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questaoDTO)))
                .andExpect(status().isOk());
    }

    @Test
    public void questaoBuscarLista() throws Exception {
        mockMvc.perform(get(API_QUESTAO))
                .andExpect(status().isOk());
    }

    @Test
    public void questaoBuscarDropdown() throws Exception {
        mockMvc.perform(get(API_QUESTAO + "dropdown"))
                .andExpect(status().isOk());
    }

    @Test
    public void questaoBuscarPorId() throws Exception {
        Questao questao = questaoBuilder.construir();
        mockMvc.perform(get(API_QUESTAO + questao.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void questaoExcluir() throws Exception {
        Questao questao = questaoBuilder.construir();
        mockMvc.perform(delete(API_QUESTAO + questao.getId()))
                .andExpect(status().isOk());
    }

}
