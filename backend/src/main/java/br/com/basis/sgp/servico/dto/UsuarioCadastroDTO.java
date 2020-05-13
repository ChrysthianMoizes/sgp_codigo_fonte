package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
public class UsuarioCadastroDTO {

    @NotNull
    @Size(max = 80, min = 4, message = "Nome inválido")
    private String nome;

    @NotNull
    @Email(message = "Email inválido")
    private String email;

    @NotNull
    @CPF(message = "CPF Inválido")
    private String cpf;

    @NotNull
    @Size(max = 20, message = "Senha inválida")
    private String senha;

    @NotNull(message = "Token inválido")
    private String token;
}
