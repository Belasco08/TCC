package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoRepository extends JpaRepository<Servico,Long> {
}
