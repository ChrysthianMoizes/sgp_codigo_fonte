package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/provas")
@RequiredArgsConstructor
public class ProvaRecurso {

    private final ProvaServico provaServico;

    @GetMapping
    public ResponseEntity<Page<ProvaListagemDTO>> listarProvasPaginadas(Pageable pageable){
        Page<ProvaListagemDTO> provas = provaServico.listarProvas(pageable);
        return ResponseEntity.ok(provas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProvaDTO> visualizarProva(@PathVariable("id") Long id){
        ProvaDTO provaDTO = provaServico.exibirPorID(id);
        return ResponseEntity.ok(provaDTO);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<SelectDTO>> visualizarDorpDownProva(){
        List<SelectDTO> provas = provaServico.listarProvaDropDown();
        return ResponseEntity.ok(provas);
    }

    @PostMapping
    public ResponseEntity<ProvaDTO> Cadastrar(@Valid @RequestBody ProvaDTO provaDTO) throws URISyntaxException {
        ProvaDTO provaCadastro = provaServico.salvar(provaDTO);
        return ResponseEntity.created(new URI("/provas/" + provaCadastro.getId())).body(provaCadastro);
    }

    @PutMapping
    public ResponseEntity<Void> editar(@Valid @RequestBody ProvaDTO provaDTO){
        provaServico.salvar(provaDTO);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
        provaServico.excluir(id);
        return ResponseEntity.ok(null);
    }

}
