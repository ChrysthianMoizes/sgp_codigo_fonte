package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.TipoQuestaoServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-questao")
@RequiredArgsConstructor
public class TipoQuestaoRecurso {

    private final TipoQuestaoServico servico;

    @GetMapping
    public ResponseEntity<List<SelectDTO>> listar() {
        return ResponseEntity.ok().body(servico.listar());
    }
}
