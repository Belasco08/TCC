package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Endereco;
import com.PetPalace.petpalace.domain.repository.EnderecoRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;

public class EnderecoRepositoryImpl implements EnderecoRepository {
    @PersistenceContext
    private EntityManager manager;
    @Override
    public List<Endereco> listar() {
        return manager.createQuery("from Endereco", Endereco.class).getResultList();
    }

    @Override
    public Endereco buscar(Long id) {
        return manager.find(Endereco.class, id);
    }

    @Override
    public Endereco salvar(Endereco endereco) {
        return manager.merge(endereco);
    }

    @Override
    public void remover(Long id) {
        Endereco endereco = buscar(id);
        if (endereco == null){
            throw new EmptyResultDataAccessException(1);
        }
        manager.remove(endereco);
    }
}
