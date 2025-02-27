INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('neonpi', 'neonpi@email.com', '111111', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('desviocromatico', 'desviocr@email.com', '222222', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('no_busoes', 'leozin@email.com', '333333', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('lele', 'lele@email.com', '444444', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('igormattos', 'botafogo@email.com', '123456dc', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO usuarios (nome_usuario, email, senha, foto_perfil, data_criacao_conta) 
VALUES ('breno', 'lula@email.com', '123456dc', X'0A0B0C', CURRENT_TIMESTAMP);

INSERT INTO posts (titulo, texto, data_criacao, id_usuario, livro, nota, imagem) 
VALUES ('Eu amo esse livro!', 'Romance de dragão.', CURRENT_TIMESTAMP, 1, 'Fouth Wing', 5, X'0A0B0C');

INSERT INTO post_autores (id_post, autor_livro) 
VALUES (1, 'Autora de Fouth Wing');

INSERT INTO posts (titulo, texto, data_criacao, id_usuario, livro, nota, imagem)
VALUES ('Absolute literatura', 'Insano', CURRENT_TIMESTAMP, 3, 'Sacramentadora', 5, X'0A0B0C');

INSERT INTO post_autores (id_post, autor_livro)
VALUES (2, 'Autora de Sacramentadora');

INSERT INTO posts (titulo, texto, data_criacao, id_usuario, livro, nota, imagem)
VALUES ('Eu amo esse livro!', 'Romance de dragão.', CURRENT_TIMESTAMP, 3, 'Fouth Wing', 5, X'0A0B0C');

INSERT INTO post_autores (id_post, autor_livro)
VALUES (3, 'Autora de Fouth Wing');