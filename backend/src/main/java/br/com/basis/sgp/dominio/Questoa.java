package br.com.basis.sgp.dominio;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "QUESTAO")
public class Questoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "DESCRICAO", nullable = false, length = 400)
    private String descricao;

    @Column(name = "ALTERNATIVA_1", nullable = false, length = 400)
    private String alternativa1;

    @Column(name = "ALTERNATIVA_2", nullable = false, length = 400)
    private String alternativa2;

    @Column(name = "ALTERNATIVA_3", nullable = false, length = 400)
    private String alternativa3;

    @Column(name = "ALTERNATIVA_4", nullable = false, length = 400)
    private String alternativa4;

    @Column(name = "ALTERNATIVA_5", nullable = false, length = 400)
    private String alternativa5;

    @Column(name = "RESPOSTA", nullable = false)
    private Integer resposta;

    @ManyToOne
    @JoinColumn(name = "ID_SENIORIDADE", nullable = false)
    private Senioridade senioridade;

    @ManyToOne
    @JoinColumn(name = "ID_TIPO_QUESTAO", nullable = false)
    private TipoQuestao tipoQuestao;
}
