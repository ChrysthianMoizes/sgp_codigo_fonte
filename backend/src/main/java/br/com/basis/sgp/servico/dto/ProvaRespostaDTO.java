package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProvaRespostaDTO {

    private Long id;
    private List<QuestaoRespostaDTO> questoes;

}

