package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.QuestaoListagemDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/questoes")
@RequiredArgsConstructor
public class QuestaoRecurso {

    private final QuestaoServico servico;

    @PostMapping
    public ResponseEntity<QuestaoDTO> salvar(@Valid QuestaoDTO questao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servico.salvar(questao));
    }


    @PutMapping
    public ResponseEntity<QuestaoDTO> alterar(@Valid QuestaoDTO questao) {
        return ResponseEntity.ok().body(servico.salvar(questao));
    }


    @GetMapping("/{id}")
    public ResponseEntity<QuestaoDTO> buscar(@PathVariable("id") Long id) {
        return ResponseEntity.ok().body(servico.obterPorId(id));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<QuestaoDTO> excluir(@PathVariable("id") Long id) {
        servico.excluir(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping
    public ResponseEntity<List<QuestaoListagemDTO>> listar() {
        return ResponseEntity.ok().body(servico.listar());
    }
}
