package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.dto.ProvaCadastroDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/provas")
@RequiredArgsConstructor
public class ProvaRecurso {

    private final ProvaServico provaServico;

    @GetMapping
    public ResponseEntity<Page<ProvaListagemDTO>> listarProvas(Pageable pageable){
        Page<ProvaListagemDTO> provas = provaServico.listarProvas(pageable);
        return ResponseEntity.ok(provas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProvaCadastroDTO> visualizarProva(@PathVariable("id") Long id){
        ProvaCadastroDTO provaCadastroDTO = provaServico.exibirPorID(id);
        return ResponseEntity.ok(provaCadastroDTO);
    }

    @PostMapping
    public ResponseEntity<ProvaCadastroDTO> Cadastrar(@Valid @RequestBody ProvaCadastroDTO provaCadastroDTO){
        ProvaCadastroDTO provaCadastroDTO1 = provaServico.salvar(provaCadastroDTO);
        return ResponseEntity.ok(provaCadastroDTO);
    }

    @PutMapping
    public ResponseEntity<Void> editar(@Valid @RequestBody ProvaCadastroDTO provaCadastroDTO){

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id){

        return ResponseEntity.ok(null);
    }

}
