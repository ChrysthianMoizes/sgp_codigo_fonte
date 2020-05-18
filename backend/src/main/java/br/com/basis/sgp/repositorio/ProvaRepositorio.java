package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Prova;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProvaRepositorio extends JpaRepository<Prova,Long>, JpaSpecificationExecutor<Prova> {

    @Override
    Optional<Prova> findById(Long id);
}
