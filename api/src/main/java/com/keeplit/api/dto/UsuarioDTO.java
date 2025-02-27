package com.keeplit.api.dto;

import java.util.List;

import com.keeplit.api.model.Post;
import com.keeplit.api.model.Usuario;

public record UsuarioDTO(
        Long id,
        String nomeUsuario,
        String email,
        String fotoPerfil,
        List<Post> posts) {

    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNomeUsuario(), usuario.getEmail(),
                usuario.getFotoPerfil(), usuario.getPosts());
    }

}
