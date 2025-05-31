package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Agendamento;
import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.repository.AgendamentoRepository;
import com.PetPalace.petpalace.domain.repository.PaisRepository;
import com.PetPalace.petpalace.domain.service.AgendamentoService;
import com.PetPalace.petpalace.domain.service.PaisService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> listar(){
        return agendamentoRepository.findAll();
    }

    @GetMapping("/{agendamento}")
    public ResponseEntity<Agendamento> buscar (@PathVariable Long agendamentoId){
        Optional<Agendamento> agendamento = agendamentoRepository.findById(agendamentoId);
        if (agendamento.isPresent()){
            return ResponseEntity.ok(agendamento.get());
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Agendamento> adicionar (@RequestBody Agendamento agendamento){
        agendamento = agendamentoService.salvar(agendamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamento);
    }

    @PutMapping("/{agendamentoId}")
    public ResponseEntity<Agendamento> atualizar (@PathVariable Long agendamentoId, @RequestBody Agendamento agendamento){
        Optional<Agendamento> agendamentoAtual = agendamentoRepository.findById(agendamentoId);
        if (agendamentoAtual.isPresent()){
            BeanUtils.copyProperties(agendamento, agendamentoAtual, "Id");
            Agendamento agendamentoSalva = agendamentoService.salvar(agendamentoAtual.get());
            return ResponseEntity.ok(agendamentoSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{agendamentoId}")
    public  ResponseEntity<Agendamento> remover (Long agendamentoId){
        try {
            agendamentoService.excluir(agendamentoId);
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
