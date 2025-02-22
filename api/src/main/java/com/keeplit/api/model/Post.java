package com.keeplit.api.model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @NotBlank
    @Column(name = "texto", nullable = false, columnDefinition = "TEXT")
    private String texto;

    @PastOrPresent
    @Column(name = "data_criacao", nullable = false)
    private Date dataCriacao;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference
    private Usuario usuario;

    @NotBlank
    @Column(name = "livro", nullable = false)
    private String livro;

    @ElementCollection
    @CollectionTable(name = "post_autores", joinColumns = @JoinColumn(name = "id_post"))
    @Column(name = "autor_livro", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT ''")
    private List<String> autoresLivro;

    @Lob
    @NotNull
    @Column(name = "imagem", nullable = false, columnDefinition = "BYTEA")
    private byte[] imagem;

}
