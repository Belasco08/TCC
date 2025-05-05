package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PaisRepositoryImpl implements PaisRepository {

    @PersistenceContext
    private EntityManager manager;
    @Override
    public List<Pais> listar() {
        return manager.createQuery("from Pais", Pais.class).getResultList();
    }

    @Override
    public Pais buscar(Long id) {
        return manager.find(Pais.class, id);
    }

    @Override
    public Pais salvar(Pais pais) {
        return manager.merge(pais);
    }

    @Transactional
    @Override
    public void remover(Long id) {
        Pais pais = buscar(id);
        if (pais == null){
            throw new EmptyResultDataAccessException(1);
        }
        manager.remove(pais);
    }
}
