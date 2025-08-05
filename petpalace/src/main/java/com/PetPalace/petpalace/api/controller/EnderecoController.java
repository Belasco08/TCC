package com.PetPalace.petpalace.api.controller;


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
import java.util.Optional;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {
    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping
    public List<Endereco> listar(){
        return enderecoRepository.findAll();
    }

    @GetMapping("/{enderecoId}")
    public ResponseEntity<Endereco> buscar(@PathVariable Long enderecoId) {
        Optional<Endereco> endereco = enderecoRepository.findById(enderecoId);
        if (endereco.isPresent()) {
            return ResponseEntity.ok(endereco.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/{enderecoId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Endereco> adicionar(@RequestBody Endereco endereco) {
        endereco = enderecoService.salvar(endereco);
        return ResponseEntity.status(HttpStatus.CREATED).body(endereco);
    }

    @PutMapping("/{enderecoId}")
    public ResponseEntity<Endereco> atualizar(@PathVariable Long enderecoId, @RequestBody Endereco endereco) {
        Optional<Endereco> enderecoAtual = enderecoRepository.findById(enderecoId);

        if (enderecoAtual.isPresent()) {
            BeanUtils.copyProperties(endereco, enderecoAtual, "id");
            Endereco enderecoSalva = enderecoService.salvar(enderecoAtual.get());
            return ResponseEntity.ok(enderecoSalva);
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
