import React from 'react';
import './styles.css';

function PerfilUser() {
    return (
        <div className="profile-page">
            {/* Header do perfil */}
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-left">
                        
                        <h1>Nome do Usuário</h1>
                    </div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">15</span>
                            <span className="stat-label">Publicações</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">23</span>
                            <span className="stat-label">Livros</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corpo principal */}
            <div className="main-content">
                {/* Bloco de Reviews */}
                <div className="reviews-section">
                    <h2>Minhas Reviews</h2>
                    <div className="review-card">
                        <h3>Título do Livro 1</h3>
                        <div className="rating">★★★★★</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                    <div className="review-card">
                        <h3>Título do Livro 2</h3>
                        <div className="rating">★★★★☆</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                </div>

                {/* Bloco de Favoritos */}
                <div className="favorites-section">
                    <h2>Meus Favoritos</h2>
                    <ul className="favorites-list">
                        <li className="favorite-item">
                            <span className="book-title">Título do Livro</span>
                            <span className="rating">★★★★★</span>
                        </li>
                        <li className="favorite-item">
                            <span className="book-title">Título do Livro</span>
                            <span className="rating">★★★★★</span>
                        </li>
                        <li className="favorite-item">
                            <span className="book-title">Título do Livro</span>
                            <span className="rating">★★★★★</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PerfilUser;