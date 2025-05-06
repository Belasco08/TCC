package com.PetPalace.petpalace.controller;


import com.PetPalace.petpalace.domain.service.EnderecoService;
import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Endereco;
import com.PetPalace.petpalace.domain.repository.EnderecoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping
    public List<Endereco> listar(){
        return enderecoRepository.listar();
    }

    @GetMapping("/{enderecoId}")
    public ResponseEntity<Endereco> buscar(@PathVariable Long enderecoId) {
        Endereco endereco = enderecoRepository.buscar(enderecoId);
        if (endereco != null) {
            return ResponseEntity.ok(endereco);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Endereco adicionar(@RequestBody Endereco endereco) {
        return enderecoService.salvar(endereco);
    }

    @PutMapping("/{enderecoId}")
    public ResponseEntity<Endereco> atualizar(@PathVariable Long enderecoId, @RequestBody Endereco endereco) {
        Endereco enderecoAtual = enderecoRepository.buscar(enderecoId);
        if (enderecoAtual != null) {
            BeanUtils.copyProperties(endereco, enderecoAtual, "id");
            enderecoAtual = enderecoRepository.salvar(enderecoAtual);
            return ResponseEntity.ok(enderecoAtual);
        }
        return  ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{enderecoId}")
    public  ResponseEntity<Endereco> remover (Long enderecoId){
        try {
            enderecoService.excluir(enderecoId);
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
