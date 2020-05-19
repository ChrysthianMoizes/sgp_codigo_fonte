package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.TipoQuestao;
import br.com.basis.sgp.repositorio.TipoQuestaoRepositorio;
import br.com.basis.sgp.servico.TipoQuestaoServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.mapper.TipoQuestaoDropdownMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TipoQuestaoServicoImpl implements TipoQuestaoServico {

    private final TipoQuestaoRepositorio repositorio;

    private final TipoQuestaoDropdownMapper tipoQuestaoMapper;

    @Override
    public List<SelectDTO> listar() {
        return tipoQuestaoMapper.toDto(repositorio.findAll());
    }

    @Override
    public Optional<TipoQuestao> findById(long id) {
        return repositorio.findById(id);
    }
}
