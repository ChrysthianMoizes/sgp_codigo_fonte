package br.com.basis.sgp.servico.mapper;

import br.com.basis.sgp.dominio.Senioridade;
import br.com.basis.sgp.servico.dto.SenioridadeDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SenioridadeMapper extends EntityMapper<SenioridadeDTO, Senioridade> {
}
