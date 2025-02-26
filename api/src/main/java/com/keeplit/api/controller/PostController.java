package com.keeplit.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.keeplit.api.dto.PostDTO;
import com.keeplit.api.model.Post;
import com.keeplit.api.repository.PostRepository;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostRepository repository;

    PostController(PostRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<PostDTO> listarPosts() {
        return repository.findAll().stream().map(PostDTO::fromEntity).toList();
    }

    @GetMapping("/{id}")
    public PostDTO buscarPostPorId(@PathVariable Long id) {
        Post post = repository.findById(id).orElseThrow();
        return PostDTO.fromEntity(post);
    }

    @GetMapping("/search")
    public List<PostDTO> buscarPosts(@RequestParam String query) {
        return repository.searchPosts(query).stream().map(PostDTO::fromEntity).toList();
    }

}
