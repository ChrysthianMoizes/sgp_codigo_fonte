package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
@Getter
@Setter
public class AvaliacaoPreenchidaDTO {
    @NotNull
    private Long id;

    @NotNull
    private Long idProva;

    @NotNull
    @Size(min=5, max=5, message = "Resposta inválida")
    private List<Long> respostas;
}
