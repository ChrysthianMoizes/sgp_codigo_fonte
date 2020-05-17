package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UsuarioCadastroDTO {

    @NotNull
    private String nome;

    @NotNull
    @Email
    private String email;

    @NotNull
    @CPF
    private String cpf;

    @NotNull
    private String senha;

    @NotNull
    private String token;
}
