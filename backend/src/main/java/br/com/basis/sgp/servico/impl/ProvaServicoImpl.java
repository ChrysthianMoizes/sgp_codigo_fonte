package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.dominio.Questao;
import br.com.basis.sgp.repositorio.ProvaRepositorio;
import br.com.basis.sgp.servico.ProvaServico;
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
    private final ProvaRepositorio provaRepositorio;
    private final ProvaDropdownMapper provaDropdownMapper;
    private final ProvaDetalhadaMapper provaDetalhadaMapper;

    @Override
    public Page<ProvaListagemDTO> listarProvas(ProvaFiltro provaFiltro,Pageable pageable) {
        Page<Prova> provas = provaRepositorio.findAll(provaFiltro.filter(),pageable);
        return provas.map(provaListagemMapper::toDto);
    }

    @Override
    public ProvaDTO exibirPorId(Long id){
        return provaMapper.toDto(buscarPorId(id));
    }

    @Override
    public ProvaDetalhadaDTO exiberProvaDetalhada(Long id) {
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
    public void excluir(Long id) {
        provaRepositorio.delete(buscarPorId(id));
    }

    @Override
    public List<SelectDTO> listarProvaDropDown() {
        List<Prova> provas = provaRepositorio.findAll();
        return provaDropdownMapper.toDto(provas);
    }

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
            throw new RegraNegocioException("Esse titulo já está em uso");
        }
    }

    private void verificarQuestoes(Prova prova){
        if(prova.getQuestoes().isEmpty()){
            throw new RegraNegocioException("Não ah questoes o suficiente");
        }
    }

}
