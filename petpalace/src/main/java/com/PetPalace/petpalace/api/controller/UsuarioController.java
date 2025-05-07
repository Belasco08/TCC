package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.model.Usuario;
import com.PetPalace.petpalace.domain.repository.UsuarioRepository;
import com.PetPalace.petpalace.domain.service.UsuarioService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar(){
        return usuarioRepository.listar();
    }
    @GetMapping("/{usuarioId}")
    public ResponseEntity<Usuario> buscar (@PathVariable Long usuarioId, @RequestBody Usuario usuario){
        Usuario usuarioAtual = usuarioRepository.buscar(usuarioId);

        if (usuarioAtual!= null){
            BeanUtils.copyProperties(usuario ,usuarioAtual , "id");
            usuarioAtual = usuarioRepository.salvar(usuarioAtual);

            return ResponseEntity.ok(usuarioAtual);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{usuarioId}")
    public  ResponseEntity<Cidade> remover (Long usuarioId){
        try {
            usuarioService.excluir(usuarioId);
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
