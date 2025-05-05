package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.repository.CidadeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.swing.text.html.parser.Entity;
import java.util.List;

public class CidadeRepositoryImpl implements CidadeRepository {

    @PersistenceContext
    private EntityManager manager;
    @Override
    public List<Cidade> listar() {
        return manager.createQuery("from Cidade", Cidade.class).getResultList();
    }

    @Override
    public Cidade buscar(Long id) {
        return manager.find(Cidade.class, id);
    }

    @Override
    public Cidade salvar(Cidade cidade) {
        return manager.merge(cidade);
    }

    @Override
    public void remover(Long id) {
        Cidade cidade = buscar(id);
        if (cidade == null){
            throw new EmptyResultDataAccessException(1);
        }
        manager.remove(cidade);
    }
}
    