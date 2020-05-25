package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.UsuarioServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.dto.UsuarioCadastroDTO;
import br.com.basis.sgp.servico.dto.UsuarioDetalhadoDTO;
import br.com.basis.sgp.servico.dto.UsuarioEdicaoDTO;
import br.com.basis.sgp.servico.dto.UsuarioListagemDTO;
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
    public ResponseEntity<Page<UsuarioListagemDTO>> listarCandidatos(@ModelAttribute UsuarioFiltro filtro, Pageable pageable) {
        Page<UsuarioListagemDTO> page = usuarioServico.listarCandidatos(filtro, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<SelectDTO>> listarCandidatosDropdown() {
        List<SelectDTO> usuarios = usuarioServico.listarCandidatosDropdown();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/filtro/{filtro}")
    public ResponseEntity<List<SelectDTO>> listarNomeCandidatosDropdown(@PathVariable String filtro) {
        List<SelectDTO> usuarios = usuarioServico.filtrarAutocomplete(filtro);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDetalhadoDTO> obterPorId(@PathVariable("id") Long id) {
        UsuarioDetalhadoDTO usuarioDTO = usuarioServico.obterPorId(id);
        return ResponseEntity.ok(usuarioDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDetalhadoDTO> logar(@RequestBody UsuarioCadastroDTO usuarioCadastroDTO) {
        UsuarioDetalhadoDTO usuarioDetalhadoDTO = usuarioServico.logar(usuarioCadastroDTO);
        return ResponseEntity.ok(usuarioDetalhadoDTO);
    }

    @PostMapping
    public ResponseEntity<UsuarioDetalhadoDTO> cadastrar(@Valid @RequestBody UsuarioCadastroDTO usuarioCadastroDTO) throws URISyntaxException {
        UsuarioDetalhadoDTO usuarioDetalhadoDTO = usuarioServico.salvar(usuarioCadastroDTO);
        return ResponseEntity.created(new URI("/usuarios/" + usuarioDetalhadoDTO.getId())).body(usuarioDetalhadoDTO);
    }

    @PutMapping
    public ResponseEntity<UsuarioDetalhadoDTO> alterar(@Valid @RequestBody UsuarioEdicaoDTO usuarioEdicaoDTO) {
        UsuarioDetalhadoDTO usuarioDetalhadoDTO = usuarioServico.alterar(usuarioEdicaoDTO);
        return ResponseEntity.ok(usuarioDetalhadoDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        usuarioServico.excluir(id);
        return ResponseEntity.ok().build();
    }
}
