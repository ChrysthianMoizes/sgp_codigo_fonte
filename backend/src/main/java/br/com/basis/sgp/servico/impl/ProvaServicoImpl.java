package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.repositorio.ProvaRepositorio;
import br.com.basis.sgp.servico.ProvaServico;
<<<<<<< HEAD
import br.com.basis.sgp.servico.QuestaoServico;
import br.com.basis.sgp.servico.dto.ProvaDTO;
import br.com.basis.sgp.servico.dto.ProvaDetalhadaDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.ProvaFiltro;
import br.com.basis.sgp.servico.mapper.ProvaDetalhadaMapper;
import br.com.basis.sgp.servico.mapper.ProvaDropdownMapper;
import br.com.basis.sgp.servico.mapper.ProvaListagemMapper;
import br.com.basis.sgp.servico.mapper.ProvaMapper;
=======
import br.com.basis.sgp.servico.dto.*;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.filtro.ProvaFiltro;
import br.com.basis.sgp.servico.mapper.*;
>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProvaServicoImpl implements ProvaServico {

    private final ProvaMapper provaMapper;
    private final ProvaListagemMapper provaListagemMapper;
    private final ProvaDropdownMapper provaDropdownMapper;
    private final ProvaDetalhadaMapper provaDetalhadaMapper;
<<<<<<< HEAD
=======
    private final ProvaRespostaMapper provaRespostaMapper;
>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d
    private final ProvaRepositorio provaRepositorio;


    @Override
    public Page<ProvaListagemDTO> listarProvas(ProvaFiltro provaFiltro, Pageable pageable) {
        Page<Prova> provas = provaRepositorio.findAll(provaFiltro.filter(),pageable);
        return provas.map(provaListagemMapper::toDto);
    }

    @Override
    public ProvaDTO exibirPorId(Long id) {
        return provaMapper.toDto(buscarPorId(id));
    }

    @Override
    public ProvaDetalhadaDTO exibirProvaDetalhada(Long id) {
        Prova prova =  buscarPorId(id);
        return provaDetalhadaMapper.toDto(prova);
    }

    @Override
    public ProvaDTO salvar(ProvaDTO provaDTO) {
        Prova prova = provaMapper.toEntity(provaDTO);

        validarProva(prova);
        verificarQuestoes(prova);

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

<<<<<<< HEAD
=======
    private Prova buscarTitulo(String titulo) {
        return provaRepositorio.findByTitulo(titulo)
                .orElseThrow(() -> new RegraNegocioException("Prova inexistente"));
    }
    @Override
    public ProvaRespostaDTO buscarRespostas(Long id) {
        return provaRespostaMapper.toDto(buscarPorId(id));
    }

>>>>>>> 3c5f0f3ae58980e6107ebc8792b9e5f1153b798d
    private Prova buscarPorId(Long id){
        return provaRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Prova inválida"));
    }

    private boolean verificarTitulo(Prova prova){
        Prova provaBusca = provaRepositorio.findByTitulo(prova.getTitulo());
        return !(provaBusca == null || provaBusca.getId().equals(prova.getId()));
    }

    private void validarProva(Prova prova){
        if(verificarTitulo(prova)){
            throw new RegraNegocioException("Este título já está em uso");
        }
    }

    private void verificarQuestoes(Prova prova){
        if(prova.getQuestoes().isEmpty()){
            throw new RegraNegocioException("Não há questões o suficiente");
        }
    }

}
