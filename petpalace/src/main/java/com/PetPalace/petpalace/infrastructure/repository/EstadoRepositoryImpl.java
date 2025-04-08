package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Estado;
import com.PetPalace.petpalace.domain.repository.EstadoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;

public class EstadoRepositoryImpl implements EstadoRepository {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<Estado> listar() {
        return manager.createQuery("from Estado", Estado.class).getResultList();
    }

    @Override
    public Estado buscar(Long id) {
        return manager.find(Estado.class, id);
    }

    @Override
    public Estado salvar(Estado estado) {
        return manager.merge(estado);
    }
    
    @Override
    public void remover(Long id) {

    }
}
