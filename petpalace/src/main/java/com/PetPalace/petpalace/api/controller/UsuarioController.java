package com.PetPalace.petpalace.api.controller;

import com.PetPalace.petpalace.domain.exception.EntidadeEmUsoException;
import com.PetPalace.petpalace.domain.exception.EntidadeNaoEncontradaException;
import com.PetPalace.petpalace.domain.model.Cidade;
import com.PetPalace.petpalace.domain.model.Pais;
import com.PetPalace.petpalace.domain.model.Usuario;
import com.PetPalace.petpalace.domain.repository.UsuarioRepository;
import com.PetPalace.petpalace.domain.service.UsuarioService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listar(){
        return usuarioRepository.findAll();
    }
    @GetMapping("/{usuarioId}")
    public ResponseEntity<Usuario> buscar (@PathVariable Long usuarioId, @RequestBody Usuario usuario){
        Optional<Usuario> usuarioAtual = usuarioRepository.findById(usuarioId);

        if (usuarioAtual.isPresent()){
            BeanUtils.copyProperties(usuario ,usuarioAtual , "id");
            Usuario usuarioSalva = usuarioService.salvar(usuarioAtual.get());
            return ResponseEntity.ok(usuarioSalva);
        }
        {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Usuario> adicionar (@RequestBody Usuario usuario){
        usuario = usuarioService.salvar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
    }

    @PutMapping("/{usuarioId}")
    public ResponseEntity<Usuario> atualizar (@PathVariable Long usuarioId, @RequestBody Usuario usuario){
        Optional<Usuario> usuarioAtual = usuarioRepository.findById(usuarioId);
        if (usuarioAtual.isPresent()){
            BeanUtils.copyProperties(usuario, usuarioAtual, "Id");
            Usuario usuarioSalva = usuarioService.salvar(usuarioAtual.get());
            return ResponseEntity.ok(usuarioSalva);
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
