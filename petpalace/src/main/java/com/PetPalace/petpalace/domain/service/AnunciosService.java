package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Anuncios;
import com.PetPalace.petpalace.domain.repository.AnunciosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class AnunciosService {
    @Autowired
    private AnunciosRepository anunciosRepository;

    public Anuncios salvar (Anuncios anuncios){
        return anunciosRepository.save(anuncios);
    }
    public void excluir(Long id){
        try{
            anunciosRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e){
            throw new EntidadeEmUsoException(String.format("Animal ou codigo %d não pode ser encontrado, pois está em uso", id));
        }
        catch (EmptyResultDataAccessException e){
            throw new EntidadeNaoEncontradaException(String.format("Não existe cadastro de Animais com codigo %d", id));
        }
    }
}
