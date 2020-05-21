package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Senioridade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SenioridadeRepositorio extends JpaRepository<Senioridade, Long> {

}
