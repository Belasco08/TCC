package com.caua.foodta.api.controller;


import com.caua.foodta.domain.Service.FormaPagamentoService;
import com.caua.foodta.domain.exception.EntidadeEmUsoException;
import com.caua.foodta.domain.exception.EntidadeNaoEncontradaException;
import com.caua.foodta.domain.model.Cozinha;
import com.caua.foodta.domain.model.FormaPagamento;
import com.caua.foodta.domain.repository.FormaPagamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/formasPagamento")
public class FormaPagamentoController {

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @Autowired
    private FormaPagamentoService formaPagamentoService;

    @GetMapping()
    public List<com.caua.foodta.domain.model.FormaPagamento> listar(){
        return formaPagamentoRepository.findAll();
    }

    @GetMapping("/{formaPagamentoId}")
    public ResponseEntity<FormaPagamento> buscar (@PathVariable Long formapagamentoId){
        Optional<FormaPagamento> formaPagamento = formaPagamentoRepository.findById(formapagamentoId);
        if (formaPagamento.isPresent()){
        return ResponseEntity.ok(formaPagamento.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping()
    public ResponseEntity<FormaPagamento> adicionar(@RequestBody FormaPagamento formaPagamento){
        formaPagamento = formaPagamentoService.salvar(formaPagamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(formaPagamento);
    }

    @DeleteMapping("/{formaPagamentoId}")
    public  ResponseEntity<FormaPagamento> remover (Long formaPagamentoId){
        try {
            formaPagamentoService.excluir(formaPagamentoId);
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
