package com.PetPalace.petpalace.domain.service;

import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaisService {
    @Autowired
    private PaisRepository paisRepository;

    public Pais salvar (Pais pais){
        return paisRepository.salvar(pais);
    }

}
