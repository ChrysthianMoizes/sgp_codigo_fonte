package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Avaliacao;
import br.com.basis.sgp.dominio.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvaliacaoRepositorio extends JpaRepository<Avaliacao,Long>{

}
