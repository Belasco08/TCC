package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.model.Servico;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import com.PetPalace.petpalace.domain.repository.ServicoRepository;
import com.PetPalace.petpalace.domain.service.PaisService;
import com.PetPalace.petpalace.domain.service.ServicoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    public List<Servico> listar(){
        return servicoRepository.findAll();
    }

    @GetMapping("/{servicoId}")
    public ResponseEntity<Servico> buscar (@PathVariable Long paisId){
        Optional<Servico> servico = servicoRepository.findById(paisId);
        if (servico.isPresent()){
            return ResponseEntity.ok(servico.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/{servicoId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Servico> adicionar (@RequestBody Servico servico){
        servico = servicoService.salvar(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(servico);
    }

    @PutMapping("/{servicoId}")
    public ResponseEntity<Servico> atualizar (@PathVariable Long servicoId, @RequestBody Servico servico){
        Optional<Servico> servicoAtual = servicoRepository.findById(servicoId);
        if (servicoAtual.isPresent()){
            BeanUtils.copyProperties(servico, servicoAtual, "Id");
            Servico servicoSalva = servicoService.salvar(servicoAtual.get());
            return ResponseEntity.ok(servicoSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{servicoId}")
    public  ResponseEntity<Servico> remover (Long servicoId){
        try {
            servicoService.excluir(servicoId);
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
