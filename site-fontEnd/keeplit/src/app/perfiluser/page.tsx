"use client";
import React, { useState, useEffect } from 'react';
import { setupAPIClient } from '../services/api';
import './styles.css';

function PerfilUser() {
    interface Review {
        bookTitle: string;
        rating: number;
        comment: string;
    }

    const [reviews, setReviews] = useState<Review[]>([]);
    interface Favorite {
        bookTitle: string;
        rating: number;
    }

    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const MAX_ITEMS_VISIBLE = 4; // Define o limite de itens antes de ativar o scroll

    useEffect(() => {
        const axios = setupAPIClient();
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Erro ao carregar reviews:', error);
            }
        };

        const fetchFavorites = async () => {
            try {
                const response = await axios.get('/favorites');
                setFavorites(response.data);
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error);
            }
        };

        fetchReviews();
        fetchFavorites();
    }, []);

    
    const getSectionClass = (itemCount: number) => {
        return itemCount > MAX_ITEMS_VISIBLE ? 'scrollable-section' : 'no-scroll';
    };

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-info">
                    <div className="profile-left">
                        <h1>Nome do Usuário</h1>
                    </div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">{reviews.length}</span>
                            <span className="stat-label">Publicações</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{favorites.length}</span>
                            <span className="stat-label">Livros</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className={`reviews-section ${getSectionClass(reviews.length)}`}>
                    <h2>Minhas Reviews</h2>
                    <div className="reviews-container">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <h3>{review.bookTitle}</h3>
                                <div className="rating">{review.rating}</div>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`favorites-section ${getSectionClass(favorites.length)}`}>
                    <h2>Meus Favoritos</h2>
                    <ul className="favorites-list">
                        {favorites.map((favorite, index) => (
                            <li key={index} className="favorite-item">
                                <span className="book-title">{favorite.bookTitle}</span>
                                <span className="rating">{favorite.rating}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PerfilUser;