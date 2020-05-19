package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class AvaliacaoListagemDTO {

    private Long id;
    private LocalDate data;
    private String nomeCandidato;
    private String tituloProva;
    private BigDecimal aproveitamento;
}
