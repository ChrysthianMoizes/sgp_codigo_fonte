package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Prova_;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProvaFiltro implements EntityFiltro {

    private Long id;
    private String titulo;
    private BigDecimal percentual;


    @Override
    public Specification filter() {
        return (root, cq, cb) ->
                cb.and(getPredicates(root, cb).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicates(Root root, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();

        if (!StringUtils.isEmpty(id)) {
            Predicate predicate = cb.equal(root.get(Prova_.id),id);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(titulo)) {
            Predicate predicate = cb.like(cb.lower(root.get(Prova_.titulo)), "%" + titulo.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(percentual)) {
            Predicate predicate = cb.equal(root.get(Prova_.percentual),percentual);
            predicates.add(predicate);
        }
        return predicates;
    }
}
