package br.com.basis.sgp.recurso;


import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.QuestaoBuilder;
import br.com.basis.sgp.builder.UsuarioBuilder;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.servico.SenioridadeServico;
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
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SgpApplication.class)
@Transactional
public class QuestaoRecursoTest {

    private static final String API_QUESTAO = "/api/questoes/";

    private MockMvc mockMvc;

    @Autowired
    private QuestaoBuilder questaoBuilder;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private SenioridadeServico senioridadeServico;

    private void deletaDados() {
        Collection<Questao> lista = questaoBuilder.obterTodos();
        lista.forEach(questao -> questaoBuilder.excluirPorId(questao.getId()));
    }

    @Before
    public void inicializaTeste() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        this.deletaDados();
        this.questaoBuilder.setCustomizacao(null);
    }

    @Test
    public void cadastrarQuestao() throws Exception{
        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();

        mockMvc.perform(post(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(questaoDTO)))
                .andExpect(status().isCreated());
    }





    @Test
    public void naoExistirSenioridade()throws Exception{
        QuestaoDTO questaoDTO = questaoBuilder.construirQuestao();
        questaoDTO.setIdSenioridade(6L);
        mockMvc.perform(get(API_QUESTAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(senioridadeServico.findById(questaoDTO.getIdSenioridade()))))
                .andExpect(status().isBadRequest());
    }



    @Test
    public void naoExistirTipoQuestao()throws Exception{}


}
