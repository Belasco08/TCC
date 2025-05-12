package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}
