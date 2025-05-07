package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Cidade;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {

}
