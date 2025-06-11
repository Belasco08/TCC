package com.caua.foodta.api.controller;


import com.caua.foodta.domain.Service.RestauranteService;
import com.caua.foodta.domain.exception.EntidadeEmUsoException;
import com.caua.foodta.domain.exception.EntidadeNaoEncontradaException;
import com.caua.foodta.domain.model.Cozinha;
import com.caua.foodta.domain.model.Restaurante;
import com.caua.foodta.domain.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private RestauranteService restauranteService;

    @GetMapping
    public List<Restaurante> listar(){
        return restauranteRepository.findAll();
    }

    @GetMapping("/{restauranteId}")
    public ResponseEntity<Restaurante> buscar(@PathVariable Long restauranteId){
        Optional<Restaurante> restaurante = restauranteRepository.findById(restauranteId);
        if(restaurante.isPresent()){
            return ResponseEntity.ok(restaurante.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Restaurante> adicionar(@RequestBody Restaurante restaurante){
        restaurante = restauranteService.salvar(restaurante);
        return ResponseEntity.status(HttpStatus.CREATED).body(restaurante); }

    @DeleteMapping("/{restauranteId}")
    public  ResponseEntity<Restaurante> remover (Long restauranteId){
        try {
            restauranteService.excluir(restauranteId);
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
