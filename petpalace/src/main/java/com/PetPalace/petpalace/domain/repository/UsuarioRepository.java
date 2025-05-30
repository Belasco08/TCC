package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByIdAndTipoUsuario(Long id, String tipoUsuario);
}
