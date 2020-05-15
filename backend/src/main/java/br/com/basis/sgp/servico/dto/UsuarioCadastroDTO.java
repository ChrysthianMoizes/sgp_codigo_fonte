package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioCadastroDTO {

    private Long id;

    private String nome;

    private String email;

    private String cpf;

    private String senha;

    private String token;
}
