package com.keeplit.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.keeplit.api.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
}
