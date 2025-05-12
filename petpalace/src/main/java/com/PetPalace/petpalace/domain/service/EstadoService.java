package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Estado;
import com.PetPalace.petpalace.domain.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

public Estado salvar (Estado estado){
    return estadoRepository.save(estado);
}


    public void excluir (Long id){
        try {
            estadoRepository.deleteById(id);
        }
        catch (DataIntegrityViolationException e){
            throw  new EntidadeEmUsoException(String.format("Estado ou codigo %d não pode ser encontrado, pois está em uso", id));
        }
        catch (EmptyResultDataAccessException e){
            throw new EntidadeNaoEncontradaException(String.format("Não existe cadastro de estado com codigo %d", id));
        }
    }
}
