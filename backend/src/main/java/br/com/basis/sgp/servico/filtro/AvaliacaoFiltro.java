package br.com.basis.sgp.servico.filtro;

import br.com.basis.sgp.dominio.Avaliacao_;
import br.com.basis.sgp.dominio.Prova_;
import br.com.basis.sgp.dominio.Usuario_;
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
    private Long idCandidato;
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
            Predicate predicate = cb.like(cb.lower(root.join(Avaliacao_.candidato).get(Usuario_.nome)), "%" + nomeCandidato.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(tituloProva)) {
            Predicate predicate = cb.like(cb.lower(root.join(Avaliacao_.prova).get(Prova_.titulo)),"%" + tituloProva.toLowerCase() + "%");
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(id)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.id),id);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(idCandidato)) {
            Predicate predicate = cb.equal(root.join(Avaliacao_.candidato).get(Usuario_.id),idCandidato);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(aproveitamento)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.aproveitamento),aproveitamento);
            predicates.add(predicate);
        }

        if (!StringUtils.isEmpty(data)) {
            Predicate predicate = cb.equal(root.get(Avaliacao_.data),data);
            predicates.add(predicate);
        }

        return predicates;
    }

}
