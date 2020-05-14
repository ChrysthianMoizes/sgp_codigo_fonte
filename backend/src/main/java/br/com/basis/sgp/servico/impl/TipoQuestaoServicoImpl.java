package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.repositorio.TipoQuestaoRepositorio;
import br.com.basis.sgp.servico.TipoQuestaoServico;
import br.com.basis.sgp.servico.dto.TipoQuestaoDTO;
import br.com.basis.sgp.servico.mapper.TipoQuestaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TipoQuestaoServicoImpl implements TipoQuestaoServico {

    private final TipoQuestaoRepositorio repositorio;

    private final TipoQuestaoMapper tipoQuestaoMapper;

    @Override
    public List<TipoQuestaoDTO> listar() {
        return tipoQuestaoMapper.toDto(repositorio.findAll());
    }
}
