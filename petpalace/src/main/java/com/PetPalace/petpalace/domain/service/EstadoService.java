package com.PetPalace.petpalace.domain.service;


import com.PetPalace.petpalace.domain.model.Estado;
import com.PetPalace.petpalace.domain.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadoService {

    @Autowired
    private EstadoRepository estadoRepository;

public Estado salvar (Estado estado){
    return estadoRepository.salvar(estado);
}
}
