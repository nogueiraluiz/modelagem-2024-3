package com.keeplit.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.keeplit.api.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("""
                SELECT p FROM Post p
                WHERE LOWER(p.usuario.nomeUsuario) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
                   OR LOWER(p.livro) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
                   OR EXISTS (
                        SELECT 1 FROM Post p2 JOIN p2.autoresLivro a
                        WHERE p2.id = p.id AND LOWER(a) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
                   )
                   OR LOWER(p.titulo) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
                   OR LOWER(p.texto) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
            """)
    List<Post> searchPosts(@Param("searchTerm") String searchTerm);

}
