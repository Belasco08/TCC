package com.caua.foodta.domain.repository;


import com.caua.foodta.domain.model.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
    @Query("from Cidade c join fetch c.estado")
    List<Cidade> findAll();
}
