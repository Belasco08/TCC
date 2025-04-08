package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Estado;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EstadoRepository {

    List<Estado> listar();
    Estado buscar (Long id);
    Estado salvar (Estado estado);

    Estado salvar(Long id);

    void remover (Long id);

}
