package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Usuario;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository {

    List<Usuario> listar();
    Usuario buscar (Long id);
    Usuario salvar (Usuario usuario);
    void remover (Long id);
}
