package com.PetPalace.petpalace.controller;


import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import com.PetPalace.petpalace.domain.service.PaisService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paises")
public class PaisController {

    @Autowired
    private PaisRepository paisRepository;

    @Autowired
    private PaisService paisService;

    @GetMapping
    public List<Pais> listar(){
        return paisRepository.listar();
    }

    @GetMapping("/{pais}")
    public ResponseEntity<Pais> buscar (@PathVariable Long paisId){
        Pais pais = paisRepository.buscar(paisId);
        if (pais!= null){
            return ResponseEntity.ok(pais);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Pais adicionar (@RequestBody Pais pais){
        return paisService.salvar(pais);
    }

    @PutMapping("/{paisId}")
    public ResponseEntity<Pais> atualizar (@PathVariable Long paisId, @RequestBody Pais pais){
        Pais paisAtual = paisRepository.buscar(paisId);
        if (paisAtual != null){
            BeanUtils.copyProperties(pais, paisAtual, "Id");
            paisAtual = paisRepository.salvar(paisAtual);
            return ResponseEntity.ok(paisAtual);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }

}
