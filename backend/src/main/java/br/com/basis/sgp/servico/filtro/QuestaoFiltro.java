package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.dominio.Questao_;
import br.com.basis.sgp.dominio.Questoa;
import br.com.basis.sgp.dominio.Senioridade_;
import br.com.basis.sgp.dominio.TipoQuestao_;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class QuestaoFiltro implements EntityFiltro<Questoa> {

    private String descricao;
    private String senioridade;
    private String tipoQuestao;

    @Override
    public Specification<Questoa> filter() {
        return (root, query, builder) -> builder.and(getPredicates(root, builder).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicates(Root<Questoa> root, CriteriaBuilder builder) {
        List<Predicate> predicates = new ArrayList<>();
        if (!StringUtils.isEmpty(descricao)) {
            Predicate predicate = builder.like(root.get(Questoa_.descricao), "%" + descricao.toLowerCase() + "%");
            predicates.add(predicate);
        }
        if (!StringUtils.isEmpty(senioridade)) {
            Predicate predicate = builder.like(root.join("senioridade").get(Senioridade_.DESCRICAO), "%" + senioridade.toLowerCase() + "%");
            predicates.add(predicate);
        }
        if (!StringUtils.isEmpty(tipoQuestao)) {
            Predicate predicate = builder.like(root.join("tipoQuestao").get(TipoQuestao_.DESCRICAO), "%" + tipoQuestao.toLowerCase() + "%");
            predicates.add(predicate);
        }
        return predicates;
    }
}