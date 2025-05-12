package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EstadoRepository extends JpaRepository<Estado, Long> {

}
