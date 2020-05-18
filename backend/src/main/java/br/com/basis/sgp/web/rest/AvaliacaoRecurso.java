package br.com.basis.sgp.web.rest;
import br.com.basis.sgp.servico.AvalicaoServico;
import br.com.basis.sgp.servico.dto.AvaliacaoListagemDTO;
import br.com.basis.sgp.servico.dto.AvaliacaoCadastroDTO;
import br.com.basis.sgp.servico.filtro.AvaliacaoFiltro;
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

@RestController
@RequestMapping("/api/avaliacoes")
@RequiredArgsConstructor
public class AvaliacaoRecurso {
    private final AvalicaoServico avaliacaoServico;

    @GetMapping
    public ResponseEntity<Page<AvaliacaoListagemDTO>> listar(@ModelAttribute AvaliacaoFiltro filtro, Pageable pageable){
        Page<AvaliacaoListagemDTO> page = avaliacaoServico.listar(filtro, pageable);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliacaoCadastroDTO> obterPorId(@PathVariable("id") Long id) {
        AvaliacaoCadastroDTO avaliacaoDTO = avaliacaoServico.obterPorId(id);
        return ResponseEntity.ok(avaliacaoDTO);
    }

    @PostMapping
    public ResponseEntity<AvaliacaoListagemDTO> cadastrar(@Valid @RequestBody AvaliacaoCadastroDTO avaliacaoCadastroDTO) throws URISyntaxException {
        AvaliacaoListagemDTO avaliacaoDTO = avaliacaoServico.salvar(avaliacaoCadastroDTO);
        return ResponseEntity.created(new URI("/avaliacao/" + avaliacaoDTO.getId())).body(avaliacaoDTO);
    }

    @PutMapping
    public ResponseEntity<AvaliacaoListagemDTO> alterar(@Valid @RequestBody AvaliacaoCadastroDTO avaliacaoCadastroDTO) {
        AvaliacaoListagemDTO avaliacaoListagemDTO = avaliacaoServico.salvar(avaliacaoCadastroDTO);
        return ResponseEntity.ok(avaliacaoListagemDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        avaliacaoServico.excluir(id);
        return ResponseEntity.ok(null);
    }
}
