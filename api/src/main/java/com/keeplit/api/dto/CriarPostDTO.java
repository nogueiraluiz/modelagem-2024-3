package com.keeplit.api.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public record CriarPostDTO(
        @NotBlank String titulo,
        @NotBlank String texto,
        @Min(1) @Max(5) Integer nota,
        @NotBlank String livro,
        @NotBlank String imagem,
        @NotEmpty List<@NotBlank String> autoresLivro) {
}