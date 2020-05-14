package br.com.basis.sgp.repository;

import br.com.basis.sgp.dominio.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long>, JpaSpecificationExecutor<Usuario> {
    @Query("SELECT u FROM Usuario u WHERE u.admin = :admin")
    List<Usuario> getAllByAdmin(@Param(value = "admin") Integer admin);

    List<Usuario> findByAdmin(Integer admin);
}
