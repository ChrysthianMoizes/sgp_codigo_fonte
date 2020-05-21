package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ProvaDTO {

    private Long id;

    @NotNull
    private String titulo;

    @NotNull
    private BigDecimal percentual;

    @NotNull
    private List<SelectDTO> questoes;

}
