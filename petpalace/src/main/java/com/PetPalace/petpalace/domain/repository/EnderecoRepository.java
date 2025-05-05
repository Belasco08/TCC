package com.PetPalace.petpalace.domain.repository;

import com.PetPalace.petpalace.domain.model.Endereco;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository {

    List<Endereco> listar();
    Endereco buscar (Long id);
    Endereco salvar (Endereco endereco);
    void remover (Long id);
}
