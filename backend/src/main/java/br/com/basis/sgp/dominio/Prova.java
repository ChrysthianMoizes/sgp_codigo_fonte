package br.com.basis.sgp.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "PROVA")
public class Prova {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "TITULO", nullable = false)
    private String titulo;

    @Column(name = "PERCENTUAL_APROVACAO", nullable = false)
    private BigDecimal percentual;

    @ManyToMany
    @JoinTable(name = "PROVA_QUESTAO",
            joinColumns = @JoinColumn(name = "ID_PROVA", referencedColumnName = "ID"),
            inverseJoinColumns= @JoinColumn(name = "ID_QUESTAO", referencedColumnName = "ID"))
    private List<Questao> questoes = new ArrayList<>();
}
