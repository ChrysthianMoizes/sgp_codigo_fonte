package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Usuario_;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UsuarioFiltro implements EntityFiltro {
    private String nome;
    private String cpf;
    private Integer admin;

    @Override
    public Specification filter() {
        return (root, cq, cb) ->
                cb.and(getPredicates(root, cb).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicates(Root root, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        if (!StringUtils.isEmpty(nome)) {
            Predicate predicate = cb.like(cb.lower(root.get(Usuario_.nome)), "%" + nome.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(cpf)) {
            Predicate predicate = cb.equal(root.get(Usuario_.cpf), cpf);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(admin)) {
            Predicate predicate = cb.equal(root.get(Usuario_.admin), admin);
            predicates.add(predicate);
        }
        return predicates;
    }


}
