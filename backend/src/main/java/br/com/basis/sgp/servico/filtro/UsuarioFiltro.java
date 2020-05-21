package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Usuario;
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
public class UsuarioFiltro implements EntityFiltro<Usuario> {
    private String nome;
    private String cpf;
    private Integer admin;
    private String email;
    private Integer id;

    @Override
    public Specification<Usuario> filter() {
        return (root, cq, cb) ->
                cb.and(getPredicates(root, cb).toArray(new Predicate[0]));
    }

    private List<Predicate> getPredicates(Root<Usuario> root, CriteriaBuilder cb) {
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

        if (!StringUtils.isEmpty(email)) {
            Predicate predicate = cb.like(cb.lower(root.get(Usuario_.email)), "%" + email.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(id)) {
            Predicate predicate = cb.equal(root.get(Usuario_.id),id);
            predicates.add(predicate);
        }

        return predicates;
    }

}
