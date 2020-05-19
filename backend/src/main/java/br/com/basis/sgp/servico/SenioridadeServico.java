package br.com.basis.sgp.servico;

import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.servico.dto.SelectDTO;

import java.util.List;
import java.util.Optional;

public interface SenioridadeServico {

    List<SelectDTO> listar();


  Optional<Senioridade> findById(Long id);
}
