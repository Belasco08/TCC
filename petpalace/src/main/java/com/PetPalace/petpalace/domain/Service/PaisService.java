package com.PetPalace.petpalace.domain.service;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class PaisService {
    @Autowired
    private PaisRepository paisRepository;

    public Pais salvar (Pais pais){
        return paisRepository.salvar(pais);
    }

    public void excluir (Long id){
        try {
            paisRepository.remover(id);
        }
        catch (DataIntegrityViolationException e){
            throw  new EntidadeEmUsoException(String.format("Pais ou codigo %d não pode ser encontrado, pois está em uso", id));
        }
        catch (EmptyResultDataAccessException e){
            throw new EntidadeNaoEncontradaException(String.format("Não existe cadastro de pais com codigo %d", id));
        }
    }

}
