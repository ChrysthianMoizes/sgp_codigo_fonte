package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProvaDetalhadaDTO {

    private Long id;

    private String titulo;

    private BigDecimal percentual;

    private List<QuestaoDetalhaDTO> questoes;

}
