package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDTO;
import br.com.basis.sgp.servico.filtro.UsuarioFiltro;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioRecurso {

    private final UsuarioServico usuarioServico;

    @GetMapping
    public ResponseEntity<Page<UsuarioDTO>> listarCandidatos(@ModelAttribute UsuarioFiltro filtro, Pageable pageable) {
        Page<UsuarioDTO> page = usuarioServico.listarCandidatos(filtro, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<SelectDTO>> listarCandidatosDropdown() {
        List<SelectDTO> usuarios = usuarioServico.listarCandidatosDropdown();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioCadastroDTO> obterPorId(@PathVariable("id") Long id) {
        UsuarioCadastroDTO usuarioDTO = usuarioServico.obterPorId(id);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> logar(@RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {
        UsuarioDTO usuarioDTO = usuarioServico.logar(usuarioCadastroDTO);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> cadastrar(@Valid @RequestBody UsuarioCadastroDTO usuarioCadastroDTO) throws URISyntaxException {
        UsuarioDTO usuarioDTO = usuarioServico.salvar(usuarioCadastroDTO);
        return ResponseEntity.created(new URI("/usuarios/" + usuarioDTO.getId())).body(usuarioDTO);
    }

    @PutMapping
    public ResponseEntity<UsuarioDTO> alterar(@Valid @RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {
        UsuarioDTO usuarioDTO = usuarioServico.salvar(usuarioCadastroDTO);
        return ResponseEntity.ok(usuarioDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        usuarioServico.excluir(id);
        return ResponseEntity.ok(null);
    }
}
