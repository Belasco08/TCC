package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaisRepositoryImpl implements PaisRepository {

    @PersistenceContext
    private Entity manager;
    @Override
    public List<Pais> listar() {
        return null;
    }

    @Override
    public Pais buscar(Long id) {
        return null;
    }

    @Override
    public Pais salvar(Pais pais) {
        return null;
    }

    @Override
    public void remover(Long id) {

    }
}
