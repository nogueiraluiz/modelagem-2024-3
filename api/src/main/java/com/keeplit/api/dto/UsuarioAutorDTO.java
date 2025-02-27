package com.keeplit.api.dto;

import com.keeplit.api.model.Usuario;

public record UsuarioAutorDTO(
        Long id,
        String nomeUsuario,
        String email,
        String fotoPerfil
) {

    public static UsuarioAutorDTO fromEntity(Usuario usuario) {
        return new UsuarioAutorDTO(usuario.getId(), usuario.getNomeUsuario(), usuario.getEmail(),
                usuario.getFotoPerfil());
    }

}
