package com.PetPalace.petpalace.api.controller;


import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Animal;
import com.PetPalace.petpalace.domain.repository.AnimalRepository;
import com.PetPalace.petpalace.domain.service.AnimalService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/animais")
public class AnimalController {
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private AnimalService animalService;
    @GetMapping
    public List<Animal> listar(){
        return animalRepository.findAll();
    }
    @GetMapping("/{animalId}")
    public ResponseEntity<Animal> buscar(@PathVariable Long animalId){
        Optional<Animal> animal = animalRepository.findById(animalId);
        if (animal.isPresent()){
            return ResponseEntity.ok(animal.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity <Animal> adicionar (@RequestBody Animal animal){
        animal = animalService.salvar(animal);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{animalId}")
    public ResponseEntity<Animal> atualizar (@PathVariable Long animalId, @RequestBody Animal animal){
        Optional<Animal> animalAtual = animalRepository.findById(animalId);
        if (animalAtual.isPresent()){
            BeanUtils.copyProperties(animal, animalAtual, "id");

            Animal animalSalva = animalService.salvar(animalAtual.get());
            return ResponseEntity.ok(animalSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{animalId}")
    public  ResponseEntity<Animal> remover (Long animalId){
        try {
            animalService.excluir(animalId);
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
