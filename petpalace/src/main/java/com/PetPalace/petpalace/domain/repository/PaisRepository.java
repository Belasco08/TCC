package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Pais;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaisRepository {
    List<Pais> listar();

    Pais buscar(Long id);
    Pais salvar( Pais pais);
    void remover (Long id);
}
