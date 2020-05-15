package br.com.basis.sgp.web.rest;

import br.com.basis.sgp.servico.SenioridadeServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/senioridades")
@RequiredArgsConstructor
public class SenioridadeRecurso {

    private final SenioridadeServico servico;

    @GetMapping
    public ResponseEntity<List<SelectDTO>> listar() {
        return ResponseEntity.ok().body(servico.listar());
    }
}
