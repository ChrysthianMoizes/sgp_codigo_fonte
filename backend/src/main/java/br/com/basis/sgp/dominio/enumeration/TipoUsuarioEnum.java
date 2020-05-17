package br.com.basis.sgp.dominio.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TipoUsuarioEnum {

    ADMIN(1),
    CANDIDATO(0);

    private Integer codigo;
}
