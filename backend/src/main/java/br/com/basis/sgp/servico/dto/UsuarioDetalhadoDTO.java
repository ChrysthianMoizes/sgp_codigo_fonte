package br.com.basis.sgp.servico.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioDetalhadoDTO {

    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private Integer admin;

}
