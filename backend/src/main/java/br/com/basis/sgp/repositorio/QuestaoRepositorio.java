package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Questao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestaoRepositorio extends JpaRepository<Questao, Long> {

}
