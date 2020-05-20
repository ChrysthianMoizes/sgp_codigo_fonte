package br.com.basis.sgp.recurso;

import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.ConstrutorDeEntidade;
import br.com.basis.sgp.builder.ProvaBuilder;
import br.com.basis.sgp.builder.UsuarioBuilder;
import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Usuario;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.mapper.ProvaMapper;
import br.com.basis.sgp.servico.mapper.UsuarioCadastroMapper;
import br.com.basis.sgp.util.TestUtil;
import liquibase.pro.packaged.A;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    public void cadastrarProva() throws Exception { //Cadstro com obijeto válido
        ProvaDTO provaDTO = provaBuilder.construirProva();

        mockMvc.perform(post(API_PROVA)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(provaDTO)))
                .andExpect(status().isCreated());
    }

    @Test
    public void cadastrarProvaSemQuestoes() throws Exception { //Cadstro com sem questoes
        ProvaDTO provaDTO = provaBuilder.construirProva();
        provaDTO.setQuestoes(new ArrayList<>());

        mockMvc.perform(post(API_PROVA)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(provaDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void lisarProvas() throws Exception { //Listagem de provas paginadas
        provaBuilder.construir();
        provaBuilder.customizar(entidade ->{
            entidade.setTitulo("Prova Estagiario");
        });

        mockMvc.perform(get(API_PROVA)).andExpect(status().isOk());
    }


    @Test
    public void buscarProvaPorId() throws Exception { //Busca por ID
        Prova prova = provaBuilder.construir();
        mockMvc.perform(get(API_PROVA+prova.getId() )).andExpect(status().isOk());
    }

    @Test
    public void buscarProvaPorIdInvalido() throws Exception { //Busca por ID invalido
        mockMvc.perform(get(API_PROVA+0L))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void buscarProvasDorpdown() throws Exception {
        provaBuilder.construir();

        mockMvc.perform(get(API_PROVA + "dropdown"))
                .andExpect(status().isOk());
    }


    @Test
    public void excluirProvaPorId() throws Exception { //Exclusão de prova
        Prova prova = provaBuilder.construir();
        mockMvc.perform(delete(API_PROVA+prova.getId() )).andExpect(status().isOk());
    }

    @Test
    public void editarProva() throws Exception { //Edição de prova com parametro correto
        Prova prova = provaBuilder.construir();
        prova.setTitulo("Prova Juior");

        mockMvc.perform(put(API_PROVA)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(provaMapper.toDto(prova))))
                .andExpect(status().isOk());
    }

    @Test
    public void editarProvaTituloInvalido() throws Exception { //Edição de prova com Titulo repetido
        provaBuilder.customizar(entidade ->{
            entidade.setTitulo("Prova Estagiario");
        }).construir();

        Prova prova = provaBuilder.customizar(entidade ->{
            entidade.setTitulo("Prova Junior");
        }).construir();

        prova.setTitulo("Prova Estagiario");

        mockMvc.perform(put(API_PROVA)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(provaMapper.toDto(prova))))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void excluirIdInvalido() throws Exception { //Excluindo prova com id inválido
        mockMvc.perform(delete(API_PROVA+0L))
                .andExpect(status().isBadRequest());
    }
}
