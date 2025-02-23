package com.keeplit.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Post> listarPosts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Post buscarPostPorId(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    @GetMapping("/search")
    public List<Post> buscarPosts(@RequestParam String query) {
        return repository.searchPosts(query);
    }

}
