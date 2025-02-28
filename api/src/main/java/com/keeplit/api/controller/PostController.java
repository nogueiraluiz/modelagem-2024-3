package com.keeplit.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.keeplit.api.dto.CriarPostDTO;
import com.keeplit.api.dto.PostDTO;
import com.keeplit.api.model.Post;
import com.keeplit.api.model.Usuario;
import com.keeplit.api.repository.PostRepository;
import com.keeplit.api.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository postRepository;
    private final UsuarioRepository usuarioRepository;

    PostController(PostRepository repository, UsuarioRepository usuarioRepository) {
        this.postRepository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping
    public List<PostDTO> listarPosts() {
        return postRepository.findAll().stream().map(PostDTO::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public PostDTO buscarPostPorId(@PathVariable Long id) {
        Post post = postRepository.findById(id).orElseThrow();
        return PostDTO.fromEntity(post);
    }

    @GetMapping("/search")
    public List<PostDTO> buscarPosts(@RequestParam String query) {
        return postRepository.searchPosts(query).stream().map(PostDTO::fromEntity).toList();
    }

    @PostMapping
    public ResponseEntity<Void> criarPost(
            @RequestHeader("Usuario-Id") Long usuarioId,
            @Valid @RequestBody CriarPostDTO postDTO) {
            
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
        Post post = new Post();
        post.setTitulo(postDTO.titulo());
        post.setTexto(postDTO.texto());
        post.setNota(postDTO.nota());
        post.setLivro(postDTO.livro());
        post.setImagem(postDTO.imagem());
        post.setUsuario(usuario);
        post.setAutoresLivro(postDTO.autoresLivro());
            
        postRepository.save(post);
            
        return ResponseEntity.noContent().build();
    }


}
