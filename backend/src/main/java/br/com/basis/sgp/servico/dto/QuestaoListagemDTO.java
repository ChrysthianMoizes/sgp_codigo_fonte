package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestaoListagemDTO {

    private Long id;
    private String titulo;
    private String descSenioridade;
    private String descTipo;
}
