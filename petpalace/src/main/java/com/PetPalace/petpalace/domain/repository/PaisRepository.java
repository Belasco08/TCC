package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Pais;

import java.util.List;

public interface PaisRepository {
    List<Pais> listar();

    Pais buscar(Long id);
    Pais salvar( Pais pais);
    void remover (Long id);
}
