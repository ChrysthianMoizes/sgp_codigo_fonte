package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioRecurso {

    private final UsuarioServico usuarioServico;

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listar() {
        List<UsuarioDTO> usuarios = usuarioServico.listar();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<UsuarioDTO>> listarPorTipo(@PathVariable("tipo") Integer tipo) {
        List<UsuarioDTO> usuarios = usuarioServico.listarPorTipo(tipo);
        return ResponseEntity.ok(usuarios);
    }

    @PostMapping
    public ResponseEntity<Void> cadastrar(@Valid @RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {
        return ResponseEntity.ok(null);
    }

    @PostMapping("filtro")
    public List<UsuarioDTO> filtrar(@RequestBody UsuarioFiltro usuarioFiltro) {
        return usuarioServico.listarPorTipo(usuarioFiltro);
    }

    @PutMapping
    public ResponseEntity<Void> alterar(@Valid @RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        return ResponseEntity.ok(null);
    }
}
