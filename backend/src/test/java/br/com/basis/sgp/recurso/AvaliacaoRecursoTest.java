package br.com.basis.sgp.recurso;


import br.com.basis.sgp.SgpApplication;
import br.com.basis.sgp.builder.AvaliacaoBuilder;
import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.mapper.AvaliacaoCadastroMapper;
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

import java.math.BigDecimal;
import java.util.Collection;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SgpApplication.class)
@Transactional
public class AvaliacaoRecursoTest {
    private static final String API_AVALIACAO = "/api/avaliacoes/";

    private MockMvc mockMvc;

    @Autowired
    private AvaliacaoCadastroMapper avaliacaoCadastroMapper;

    @Autowired
    private AvaliacaoBuilder avaliacaoBuilder;

    @Autowired
    private WebApplicationContext webApplicationContext;

    private void deletaDados() {
        Collection<Avaliacao> avaliacoes = avaliacaoBuilder.obterTodos();
        avaliacoes.forEach(avaliacao -> avaliacaoBuilder.excluirPorId(avaliacao.getId()));
    }

    @Before
    public void inicializaTeste() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        deletaDados();
        avaliacaoBuilder.setCustomizacao(null);
    }

    //cadastrar avaliação com sucesso
    @Test
    public void cadastrarAvalicao() throws Exception {
        AvaliacaoCadastroDTO avaliacaoCadastroDTO = avaliacaoBuilder.construirAvaliacao();

        mockMvc.perform(post(API_AVALIACAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(avaliacaoCadastroDTO)))
                .andExpect(status().isCreated());
    }

    //erro ao cadastrar avaliacao com aproveitamento
    @Test
    public void cadastrarAvalicaoComAproveitamento() throws Exception {
        AvaliacaoCadastroDTO avaliacaoCadastroDTO = avaliacaoBuilder.construirAvaliacao();
        avaliacaoCadastroDTO.setAproveitamento(BigDecimal.valueOf(80));
        mockMvc.perform(post(API_AVALIACAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(avaliacaoCadastroDTO.getAproveitamento())))
                .andExpect(status().isBadRequest());
    }

    //    Buscar todos os registros
    @Test
    public void buscarAvaliacoesComSucesso() throws Exception {
        mockMvc.perform(get(API_AVALIACAO))
                .andExpect(status().isOk());
    }

    //    Editar Avaliacao Com Sucesso Sem aproveitamento
    @Test
    public void editarAvaliacaoComSucesso() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construirEntidade();

        avaliacao = avaliacaoBuilder.persistir(avaliacao);
        AvaliacaoCadastroDTO avaliacaoEdicaoDTO = avaliacaoCadastroMapper.toDto(avaliacao);

        mockMvc.perform(put(API_AVALIACAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(avaliacaoEdicaoDTO)))
                .andExpect(status().isOk());
    }

    //  Editar Avaliacao Com Sucesso com aproveitamento válido
    @Test
    public void editarAvaliacaoComAproveitamento() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construirEntidade();

        avaliacao = avaliacaoBuilder.persistir(avaliacao);
        AvaliacaoCadastroDTO avaliacaoEdicaoDTO = avaliacaoCadastroMapper.toDto(avaliacao);

        avaliacaoEdicaoDTO.setAproveitamento(BigDecimal.valueOf(90));

        mockMvc.perform(put(API_AVALIACAO)
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(avaliacaoEdicaoDTO)))
                .andExpect(status().isBadRequest());
    }

    //    Buscar por ID com sucesso
    @Test
    public void buscarPorIdComSucesso() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construir();
        Long id = avaliacao.getId();
        mockMvc.perform(get(API_AVALIACAO + id))
                .andExpect(status().isOk());
    }

    //    Não Retornar Avaliação Inexistente
    @Test
    public void buscarAvaliacaoNaoExistente() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construir();
        long id = avaliacao.getId() + 100;
        mockMvc.perform(get(API_AVALIACAO + id))
                .andExpect(status().isBadRequest());
    }

    //    Deletar Avaliacao com Sucesso
    @Test
    public void deletarAvaliacaoComSucesso() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construir();
        Long id = avaliacao.getId();
        avaliacao.setAproveitamento(null);
        mockMvc.perform(delete(API_AVALIACAO + id))
                .andExpect(status().isOk());
    }

    //    Deletar Avaliacao Não Existente
    @Test
    public void deletarAvaliacaoNaoExistente() throws Exception {
        Avaliacao avaliacao = avaliacaoBuilder.construir();
        Long id = avaliacao.getId() + 100;
        mockMvc.perform(delete(API_AVALIACAO + id))
                .andExpect(status().isBadRequest());
    }

}
