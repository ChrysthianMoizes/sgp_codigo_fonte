package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Prova;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvaRepositorio extends JpaRepository<Prova,Long>, JpaSpecificationExecutor<Prova> {

    Prova findByTitulo(String titulo);

}
