package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProvaListagemDTO {

    private Long id;
    private String titulo;
    private BigDecimal percentual;

}

