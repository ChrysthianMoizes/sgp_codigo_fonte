package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Avaliacao_;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class AvaliacaoFiltro implements EntityFiltro {

    private Long id;
    private LocalDate data;
    private String nomeCandidato;
    private String tituloProva;
    private BigDecimal aproveitamento;
    private BigDecimal situacaoAvaliacao;

    @Override
    public Specification filter() {
        return (root, cq, cb) ->
                cb.and(getPredicates(root, cb).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicates(Root root, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        if (!StringUtils.isEmpty(nomeCandidato)) {
            Predicate predicate = cb.like(cb.lower(root.get(Avaliacao_.candidato)), "%" + nomeCandidato.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(tituloProva)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.prova.getName()),tituloProva);
            predicates.add(predicate);
        }
//
        if (!StringUtils.isEmpty(aproveitamento)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.aproveitamento),aproveitamento);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(data)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.data),data);
            predicates.add(predicate);
        }

//        if (!StringUtils.isEmpty(situacaoAvaliacao)) {
//            Predicate predicate = cb.equal(root.get(Avaliacao_.),aproveitamento);
//            predicates.add(predicate);
//        }

        return predicates;
    }

}
