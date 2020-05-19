package br.com.basis.sgp.servico;

import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.servico.dto.SelectDTO;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

public interface TipoQuestaoServico {

    List<SelectDTO> listar();

    Optional<TipoQuestao> findById(long id);
}
