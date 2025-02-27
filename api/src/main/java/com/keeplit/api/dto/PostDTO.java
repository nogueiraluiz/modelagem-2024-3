package com.keeplit.api.dto;

import java.util.Date;
import java.util.List;

import com.keeplit.api.model.Post;

public record PostDTO(
        Long id,
        String titulo,
        String texto,
        Date dataCriacao,
        String livro,
        Integer nota,
        List<String> autoresLivro,
        String imagem,
        UsuarioDTO autor) {

    public static PostDTO fromEntity(Post post) {
        return new PostDTO(
                post.getId(),
                post.getTitulo(),
                post.getTexto(),
                post.getDataCriacao(),
                post.getLivro(),
                post.getNota(),
                post.getAutoresLivro(),
                post.getImagem() != null ? post.getImagem() : null, // Convertendo byte[] para String Base64
                UsuarioDTO.fromEntity(post.getUsuario()));
    }
}
