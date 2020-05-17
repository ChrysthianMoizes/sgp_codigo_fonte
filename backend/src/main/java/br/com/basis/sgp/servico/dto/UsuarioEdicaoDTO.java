package br.com.basis.sgp.servico.dto;



import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
@Getter
@Setter
public class UsuarioEdicaoDTO {

    @NotNull
    private Long id;

    @NotNull
    private String nome;

    @NotNull
    @Email
    private String email;

    private String senha;

}
