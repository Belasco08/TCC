package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Anuncios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnunciosRepository extends JpaRepository<Anuncios,Long> {
}
