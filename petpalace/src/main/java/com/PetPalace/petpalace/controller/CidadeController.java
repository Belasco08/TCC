package com.PetPalace.petpalace.controller;

import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.repository.CidadeRepository;
import com.PetPalace.petpalace.domain.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/cidades")
public class CidadeController {

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private CidadeService cidadeService;

    public ResponseEntity<Cidade> buscar (@PathVariable Long cidadeId){
        Cidade cidade = cidadeRepository.buscar(cidadeId);
        if (cidade!= null){
            return ResponseEntity.ok(cidade);
        }
            return ResponseEntity.notFound().build();
    }
}
