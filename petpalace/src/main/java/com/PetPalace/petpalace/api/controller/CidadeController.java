package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.repository.CidadeRepository;
import com.PetPalace.petpalace.domain.service.CidadeService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/cidades")
public class   CidadeController {

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private CidadeService cidadeService;

    @GetMapping
    public List<Cidade> listar(){
        return cidadeRepository.findAll();
    }

    @GetMapping("/{cidadeId}")
    public ResponseEntity<Cidade> buscar (@PathVariable Long cidadeId){
        Optional<Cidade> cidade = cidadeRepository.findById(cidadeId);
        if (cidade.isPresent()){
            return ResponseEntity.ok(cidade.get());
        }
            return ResponseEntity.notFound().build();
    }
    @PostMapping("/{cidadeId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Cidade> adicionar (@RequestBody Cidade cidade){
        cidade = cidadeService.salvar(cidade);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PutMapping("/{cidadeId}")
    public ResponseEntity<Cidade> atualizar (@PathVariable Long cidadeId,@RequestBody Cidade cidade){
        Optional<Cidade> cidadeAtual = cidadeRepository.findById(cidadeId);

        if (cidadeAtual.isPresent()){
            BeanUtils.copyProperties(cidade ,cidadeAtual , "id");

            Cidade cidadeSalva = cidadeService.salvar(cidadeAtual.get());

            return ResponseEntity.ok(cidadeSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{cidadeId}")
    public  ResponseEntity<Cidade> remover (Long cidadeId){
        try {
            cidadeService.excluir(cidadeId);
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
