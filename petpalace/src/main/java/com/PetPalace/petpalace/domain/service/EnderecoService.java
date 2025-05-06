package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Endereco;
import com.PetPalace.petpalace.domain.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    public Endereco salvar (Endereco endereco){
        return enderecoRepository.salvar(endereco);
    }

    public void excluir (Long id){
        try {
            enderecoRepository.remover(id);
        }
        catch (DataIntegrityViolationException e){
            throw new EntidadeEmUsoException(String.format("Endereco ou codigo %d não pode ser encontrado, pois está em uso", id));
        }
        catch (EmptyResultDataAccessException e){
            throw new EntidadeNaoEncontradaException(String.format("Não existe cadastro de endereço com codigo %d", id));
        }
    }
}
