package com.caua.foodta.api.controller;


import com.caua.foodta.domain.Service.CozinhaService;
import com.caua.foodta.domain.exception.EntidadeEmUsoException;
import com.caua.foodta.domain.exception.EntidadeNaoEncontradaException;
import com.caua.foodta.domain.model.Cozinha;
import com.caua.foodta.domain.repository.CozinhaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cozinhas")
public class CozinhaController {

@Autowired
    private CozinhaRepository cozinhaRepository;

@Autowired
private CozinhaService cozinhaService;

@GetMapping
    public List<Cozinha> listar(){
    return cozinhaRepository.findAll();
    }


    @GetMapping("/{cozinhaId}")
    public ResponseEntity<Cozinha> buscar (@PathVariable Long cozinhaId){
        Optional<Cozinha> cozinha = cozinhaRepository.findById(cozinhaId);

        if (cozinha.isPresent()){
            return ResponseEntity.ok(cozinha.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping()
    public ResponseEntity <Cozinha> adicionar(@RequestBody Cozinha cozinha){
        cozinha = cozinhaService.salvar(cozinha);
        return ResponseEntity.status(HttpStatus.CREATED).body(cozinha);
    }

    @PutMapping("/{cozinhaId}")
    public ResponseEntity<Cozinha> atualizar(@PathVariable Long cozinhaId,@RequestBody Cozinha cozinha){
        Optional<Cozinha> cozinhaAtual = cozinhaRepository.findById(cozinhaId);
        if (cozinhaAtual.isPresent()){
            BeanUtils.copyProperties(cozinha, cozinhaAtual, "id");
            Cozinha cozinhaSalva = cozinhaService.salvar(cozinhaAtual.get());
            return ResponseEntity.ok(cozinhaSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{cozinhaId}")
    public  ResponseEntity<Cozinha> remover (Long cozinhaId){
        try {
            cozinhaService.excluir(cozinhaId);
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

