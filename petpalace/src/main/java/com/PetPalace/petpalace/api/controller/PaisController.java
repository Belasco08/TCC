package com.PetPalace.petpalace.api.controller;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import com.PetPalace.petpalace.domain.service.PaisService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paises")
public class PaisController {

    @Autowired
    private PaisRepository paisRepository;

    @Autowired
    private PaisService paisService;

    @GetMapping
    public List<Pais> listar(){
        return paisRepository.findAll();
    }

    @GetMapping("/{paisId}")
    public ResponseEntity<Pais> buscar (@PathVariable Long paisId){
        Optional<Pais> pais = paisRepository.findById(paisId);
        if (pais.isPresent()){
            return ResponseEntity.ok(pais.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/{paisId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Pais> adicionar (@RequestBody Pais pais){
        pais = paisService.salvar(pais);
        return ResponseEntity.status(HttpStatus.CREATED).body(pais);
    }

    @PutMapping("/{paisId}")
    public ResponseEntity<Pais> atualizar (@PathVariable Long paisId, @RequestBody Pais pais){
        Optional<Pais> paisAtual = paisRepository.findById(paisId);
        if (paisAtual.isPresent()){
            BeanUtils.copyProperties(pais, paisAtual, "Id");
            Pais paisSalva = paisService.salvar(paisAtual.get());
            return ResponseEntity.ok(paisSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{paisId}")
    public  ResponseEntity<Pais> remover (Long paisId){
        try {
            paisService.excluir(paisId);
            return ResponseEntity.notFound().build();
        }
        catch (EntidadeNaoEncontradaException e){
            return ResponseEntity.notFound().build();
        }
        catch (EntidadeEmUsoException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
