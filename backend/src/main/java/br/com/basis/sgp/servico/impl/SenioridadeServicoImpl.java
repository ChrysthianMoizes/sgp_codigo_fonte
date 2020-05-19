package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.repositorio.SenioridadeRepositorio;
import br.com.basis.sgp.servico.SenioridadeServico;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.mapper.SenioridadeDropdownMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SenioridadeServicoImpl implements SenioridadeServico {

    private final SenioridadeRepositorio repositorio;

    private final SenioridadeDropdownMapper senioridadeMapper;

    @Override
    public List<SelectDTO> listar() {
        return senioridadeMapper.toDto(repositorio.findAll());
    }

    @Override
    public Optional<Senioridade> findById(Long id) {
        return repositorio.findById(id);
    }
}
