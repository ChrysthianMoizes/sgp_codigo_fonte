package br.com.basis.sgp.servico.dto;

import br.com.basis.sgp.dominio.Questao;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProvaCadastroDTO {

    private Long id;

    private String titulo;

    private BigDecimal percentual;

    private List<Questao> questoes;

}
