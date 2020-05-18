package br.com.basis.sgp.repositorio;

import br.com.basis.sgp.dominio.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario,Long>, JpaSpecificationExecutor<Usuario> {

    Usuario findByCpf(String cpf);

    Usuario findByEmail(String email);

    Optional<Usuario> findByEmailAndSenha(String email, String senha);

    List<Usuario> findAllByAdmin(Integer admin);

    List<Usuario> findAllByNomeContainsIgnoreCase(String query);

}
