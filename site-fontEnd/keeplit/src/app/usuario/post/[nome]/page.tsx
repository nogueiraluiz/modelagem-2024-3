'use client';

import { useParams } from 'next/navigation';
import './style.css';

export default function Home() {
  const params = useParams();
  const { nome } = params;

  return (
    <div className="main-background">
      {/* Navbar Esquerda */}
      <div className="left-navbar">
        <div className="logo">KeepLit</div>
        <div className="user-profile">
          <div className="user-avatar"></div>
          <h2>{nome}</h2>
        </div>
        <div className="logout-button">
          <img src="./images/icon.png" alt="Logout Icon" className="logout-icon" />
          Logout
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="main-container">
        <div className="main-header">
          <h1 className="title-text">Título</h1>
          <div className="date-time">
            <span>08/01/2025</span>
            <span>14:00</span>
          </div>
        </div>

        <div className="content-box">
          <p className="body-text">
            Entra no mundo brutal, mágico e envolvente de uma escola de elite para cavaleiros de dragões...
          </p>
        </div>
      </div>

      {/* Navbar Direita */}
      <div className="right-navbar">
        <h2 className="new-post-title">Novo Post</h2>
        <div className="post-section">
          <input 
            type="text" 
            placeholder="Título do seu post"
            className="post-input"
          />
        </div>
        <div className="book-card">
          <h3 className="book-title">Título do Livro</h3>
          <p className="book-author">Autor</p>
        </div>
        <button className="publish-button">
          <span>Publicar</span>
        </button>
      </div>
    </div>
  );
}