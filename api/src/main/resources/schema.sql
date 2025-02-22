-- Criando a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto_perfil BLOB NOT NULL,
    data_criacao_conta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criando a tabela de posts
CREATE TABLE IF NOT EXISTS posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario BIGINT NOT NULL,
    livro VARCHAR(255) NOT NULL,
    imagem BLOB NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criando a tabela de relacionamento post-autores
CREATE TABLE IF NOT EXISTS post_autores (
    id_post BIGINT NOT NULL,
    autor_livro VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_post) REFERENCES posts(id) ON DELETE CASCADE
);
