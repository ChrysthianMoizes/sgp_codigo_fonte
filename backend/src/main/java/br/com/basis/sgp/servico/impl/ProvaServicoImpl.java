package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.repositorio.ProvaRepositorio;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.dto.*;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.ProvaFiltro;
import br.com.basis.sgp.servico.mapper.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProvaServicoImpl implements ProvaServico {

    private final ProvaMapper provaMapper;
    private final ProvaListagemMapper provaListagemMapper;
    private final ProvaDropdownMapper provaDropdownMapper;
    private final ProvaDetalhadaMapper provaDetalhadaMapper;
    private final ProvaRespostaMapper provaRespostaMapper;
    private final ProvaRepositorio provaRepositorio;


    @Override
    public Page<ProvaListagemDTO> listarProvas(ProvaFiltro provaFiltro, Pageable pageable) {
        Page<Prova> provas = provaRepositorio.findAll(provaFiltro.filter(),pageable);
        return provas.map(provaListagemMapper::toDto);
    }

    @Override
    public ProvaDTO exibirPorId(Long id){
        return provaMapper.toDto(buscarPorId(id));
    }

    @Override
    public ProvaListagemDTO buscarPorTitulo(String titulo) {
        return provaListagemMapper.toDto(buscarTitulo(titulo));
    }

    @Override
    public ProvaDTO salvar(ProvaDTO provaDTO) {
        Prova prova = provaMapper.toEntity(provaDTO);
        provaRepositorio.save(prova);
        return provaMapper.toDto(prova);
    }

    @Override
    public List<SelectDTO> filtrarAutocomplete(String query) {
        return provaDropdownMapper.toDto(provaRepositorio.findAllByTituloContainsIgnoreCase(query));
    }

    @Override
    public void excluir(Long id) {
        provaRepositorio.delete(buscarPorId(id));
    }

    @Override
    public ProvaDetalhadaDTO exibirProvaDetalhada(Long id) {
        Prova prova = buscarPorId(id);
        return provaDetalhadaMapper.toDto(prova);
    }

    @Override
    public List<SelectDTO> listarProvaDropDown() {
        return provaDropdownMapper.toDto(provaRepositorio.findAll());
    }

    private Prova buscarTitulo(String titulo) {
        return provaRepositorio.findByTitulo(titulo)
                .orElseThrow(() -> new RegraNegocioException("Prova inexistente"));
    }
    @Override
    public ProvaRespostaDTO buscarRespostas(Long id) {
        return provaRespostaMapper.toDto(buscarPorId(id));
    }

    private Prova buscarPorId(Long id){
        return provaRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Prova inválida"));    
    }

}
