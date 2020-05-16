package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestaoDTO {

    private Long id;
    private String descricao;
    private String alternativa1;
    private String alternativa2;
    private String alternativa3;
    private String alternativa4;
    private String alternativa5;
    private String descSenioridade;
    private String descTipo;
}
