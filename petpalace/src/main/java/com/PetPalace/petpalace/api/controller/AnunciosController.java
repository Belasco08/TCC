package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Animal;
import com.PetPalace.petpalace.domain.model.Anuncios;
import com.PetPalace.petpalace.domain.repository.AnimalRepository;
import com.PetPalace.petpalace.domain.repository.AnunciosRepository;
import com.PetPalace.petpalace.domain.service.AnimalService;
import com.PetPalace.petpalace.domain.service.AnunciosService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/anuncios")
public class AnunciosController{
        @Autowired
        private AnunciosRepository anunciosRepository;
        @Autowired
        private AnunciosService anunciosService;
        @GetMapping
        public List<Anuncios> listar(){
            return anunciosRepository.findAll();
        }
        @GetMapping("/{anunciosId}")
        public ResponseEntity<Anuncios> buscar(@PathVariable Long anunciosId){
            Optional<Anuncios> anuncios = anunciosRepository.findById(anunciosId);
            if (anuncios.isPresent()){
                return ResponseEntity.ok(anuncios.get());
            }
            return ResponseEntity.notFound().build();
        }

        @PostMapping()
        @ResponseStatus(HttpStatus.CREATED)
        public ResponseEntity <Anuncios> adicionar (@RequestBody Anuncios anuncios){
            anuncios = anunciosService.salvar(anuncios);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        @PutMapping("/{anunciosId}")
        public ResponseEntity<Anuncios> atualizar (@PathVariable Long anunciosId, @RequestBody Anuncios anuncios){
            Optional<Anuncios> anunciosAtual = anunciosRepository.findById(anunciosId);
            if (anunciosAtual.isPresent()){
                BeanUtils.copyProperties(anuncios, anunciosAtual, "id");

                Anuncios anunciosSalva = anunciosService.salvar(anunciosAtual.get());
                return ResponseEntity.ok(anunciosSalva);
            }
            {
                return ResponseEntity.notFound().build();
            }
        }

        @DeleteMapping("/{anunciosId}")
        public  ResponseEntity<Anuncios> remover (Long anunciosId){
            try {
                anunciosService.excluir(anunciosId);
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
