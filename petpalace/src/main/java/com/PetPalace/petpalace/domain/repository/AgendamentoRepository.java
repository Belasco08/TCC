package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}
