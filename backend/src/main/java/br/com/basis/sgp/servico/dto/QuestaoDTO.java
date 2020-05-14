package br.com.basis.sgp.servico.dto;

import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.dominio.TipoQuestao;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class QuestaoDTO {

    private Long id;

    @Size(max = 400, message = "Tamanho da DESCRIÇÃO inválido")
    @NotNull(message = "Campo DESCRIÇÃO não deve ficar em branco")
    private String descricao;

    @Size(max = 400, message = "Tamanho da ALTERNATIVA inválido")
    @NotNull(message = "Campo ALTERNATIVA não deve ficar em branco")
    private String alternativa1;

    @Size(max = 400, message = "Tamanho da ALTERNATIVA inválido")
    @NotNull(message = "Campo ALTERNATIVA não deve ficar em branco")
    private String alternativa2;

    @Size(max = 400, message = "Tamanho da ALTERNATIVA inválido")
    @NotNull(message = "Campo ALTERNATIVA não deve ficar em branco")
    private String alternativa3;

    @Size(max = 400, message = "Tamanho da ALTERNATIVA inválido")
    @NotNull(message = "Campo ALTERNATIVA não deve ficar em branco")
    private String alternativa4;

    @Size(max = 400, message = "Tamanho da ALTERNATIVA inválido")
    @NotNull(message = "Campo ALTERNATIVA não deve ficar em branco")
    private String alternativa5;

    @NotNull(message = "Campo RESPOSTA não deve ficar em branco")
    private Integer resposta;

    @NotNull(message = "Campo SENIORIDADE não deve ficar em branco")
    private Senioridade senioridade;

    @NotNull(message = "Campo TIPO DE QUESTÃO não deve ficar em branco")
    private TipoQuestao tipoQuestao;

}
