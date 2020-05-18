package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UsuarioLoginDTO {
    @NotNull
    private String email;
    @NotNull
    private String senha;
}
