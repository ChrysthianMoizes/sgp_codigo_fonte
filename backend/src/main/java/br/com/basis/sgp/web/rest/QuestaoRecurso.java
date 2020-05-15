package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.QuestaoDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/questoes")
@RequiredArgsConstructor
public class QuestaoRecurso {

    private final QuestaoServico questaoServico;

    //    public ResponseEntity<Page<QuestaoDTO>> listarCandidatos(@ModelAttribute QuestaoFiltro questaoFiltro, Pageable pageable) {
//        Page<QuestaoDTO> page = questaoServico.listarQuestoesDropdown(questaoFiltro, pageable);
//        return ResponseEntity.ok(page);
//    }

    @PostMapping
    public ResponseEntity<QuestaoDTO> cadastrar(@Valid @RequestBody QuestaoDTO questaoDTO) {
        QuestaoDTO questao = questaoServico.salvar(questaoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(questao);
    }

    @PutMapping
    public ResponseEntity<QuestaoDTO> alterar(@Valid @RequestBody QuestaoDTO questaoDTO) {
        QuestaoDTO questao = questaoServico.salvar(questaoDTO);
        return ResponseEntity.ok(questao);
    }

    @GetMapping("/dropdown")
    public ResponseEntity<List<SelectDTO>> listarQuestoesDropdown() {
        List<SelectDTO> questoesDropdown = questaoServico.listarQuestoesDropdown();
        return ResponseEntity.ok(questoesDropdown);
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuestaoDTO> obterPorId(@PathVariable("id") Long id) {
        QuestaoDTO questao = questaoServico.obterPorId(id);
        return ResponseEntity.ok(questao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        questaoServico.excluir(id);
        return ResponseEntity.noContent().build();
    }

}
