package com.keeplit.api.dto;

import com.keeplit.api.model.Usuario;

public record UsuarioDTO(
        Long id,
        String nomeUsuario,
        String email,
        String fotoPerfil) {

    public static UsuarioDTO fromEntity(Usuario usuario) {
        return new UsuarioDTO(usuario.getId(), usuario.getNomeUsuario(), usuario.getEmail(),
                usuario.getFotoPerfil());
    }

}
