package com.PetPalace.petpalace.infrastructure.repository;

import com.PetPalace.petpalace.domain.model.Usuario;
import com.PetPalace.petpalace.domain.repository.UsuarioRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;

public class UsuarioRepositoryImpl implements UsuarioRepository {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<Usuario> listar() {
        return manager.createNamedQuery("from Usuario", Usuario.class).getResultList();
    }

    @Override
    public Usuario buscar(Long id) {
        return manager.find(Usuario.class, id);
    }

    @Override
    public Usuario salvar(Usuario usuario) {
        return manager.merge(usuario);
    }

    @Override
    public void remover(Long id) {
        Usuario usuario = buscar(id);
        if (usuario == null){
            throw new EmptyResultDataAccessException(1);
        }
        manager.remove(usuario);
    }
}
