package com.keeplit.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.keeplit.api.dto.UsuarioDTO;
import com.keeplit.api.model.Usuario;
import com.keeplit.api.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioRepository repository;

    UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        return repository.findAll().stream().map(UsuarioDTO::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public UsuarioDTO buscarUsuarioPorId(@PathVariable Long id) {
        return repository.findById(id)
            .map(UsuarioDTO::fromEntity)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> cadastro(@Valid @RequestBody Usuario usuario) {
        if (repository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario usuarioSalvo = repository.save(usuario);
        return ResponseEntity.ok(UsuarioDTO.fromEntity(usuarioSalvo));
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> login(@RequestBody Usuario usuario) {
        Usuario usuarioLogado = repository.findByEmail(usuario.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (usuarioLogado.getSenha().equals(usuario.getSenha())) {
            return ResponseEntity.ok(UsuarioDTO.fromEntity(usuarioLogado));
        } else {
            return ResponseEntity.status(401).build();
        }
    }
    

}
