package com.keeplit.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Usuario> listarUsuarios() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuarioPorId(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @PostMapping
    public ResponseEntity<Usuario> adicionarUsuario(@Valid @RequestBody Usuario usuario) {
        if (repository.existsByEmail(usuario.getEmail())) {
            return ResponseEntity.badRequest().build();
        }
        Usuario usuarioSalvo = repository.save(usuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

}
