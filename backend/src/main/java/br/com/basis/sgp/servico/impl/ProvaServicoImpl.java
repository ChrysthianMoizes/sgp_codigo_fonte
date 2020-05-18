package br.com.basis.sgp.servico.impl;

import br.com.basis.sgp.dominio.Prova;
import br.com.basis.sgp.repositorio.ProvaRepositorio;
import br.com.basis.sgp.servico.ProvaServico;
import br.com.basis.sgp.servico.dto.ProvaCadastroDTO;
import br.com.basis.sgp.servico.dto.ProvaListagemDTO;
import br.com.basis.sgp.servico.dto.SelectDTO;
import br.com.basis.sgp.servico.exception.RegraNegocioException;
import br.com.basis.sgp.servico.mapper.ProvaCadastroMapper;
import br.com.basis.sgp.servico.mapper.ProvaDropdownMapper;
import br.com.basis.sgp.servico.mapper.ProvaListagemMapper;
import br.com.basis.sgp.servico.mapper.UsuarioDropdownMapper;
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

    private final ProvaCadastroMapper provaCadastroMapper;
    private final ProvaListagemMapper provaListagemMapper;
    private final ProvaDropdownMapper provaDropdownMapper;
    private final ProvaRepositorio provaRepositorio;

    @Override
    public Page<ProvaListagemDTO> listarProvas(Pageable pageable) {
        Page<Prova> provas = provaRepositorio.findAll(pageable);
        return provas.map(provaListagemMapper::toDto);
    }

    @Override
    public ProvaCadastroDTO exibirPorID(Long id){
        return provaCadastroMapper.toDto(buscarPorId(id));
    }

    @Override
    public ProvaCadastroDTO salvar(ProvaCadastroDTO provaCadastroDTO) {
        Prova prova = provaCadastroMapper.toEntity(provaCadastroDTO);
        provaRepositorio.save(prova);
        return provaCadastroMapper.toDto(prova);
    }

    @Override
    public List<SelectDTO> autocomplete(String query) {
        return provaDropdownMapper.toDto(provaRepositorio.findAllByTituloContainsIgnoreCase(query));
    }

    @Override
    public void excluir(Long id) {
        provaRepositorio.delete(buscarPorId(id));
        return ;
    }

    private Prova buscarPorId(Long id){
        Prova prova = provaRepositorio.findById(id)
                .orElseThrow(() -> new RegraNegocioException("Prova inválida"));

        return prova;
    }

}
