'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import './style.css';

export default function Home() {
  const params = useParams();
  const { nome } = params;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleRating = (rate: number) => {
    setRating(rate);
  };

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
          <div className="header-left">
            <div className="user-avatar"></div>
            <div className="user-name">{nome}</div>
          </div>
          <div className="header-center">
            <h1 className="title-text">Título</h1>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= (hover || rating) ? 'filled' : ''} ${star - 0.5 === (hover || rating) ? 'half-filled' : ''}`}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="header-right">
            <div className="post-date">08/01/2025</div>
            <div className="post-time">14:00</div>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="content-box">
            <p className="body-text">
              Entra no mundo brutal, mágico e envolvente de uma escola de elite para cavaleiros de dragões...
            </p>
          </div>

          <div className="book-section">
            <div className="rectangle-3"></div>
            <h2 className="book-title">Título do Livro</h2>
            <p className="book-author">Autor</p>
            <div className="rectangle-16">
              <h3 className="feed-title">FEED</h3>
              <div className="ellipse-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Direita */}
      <div className="right-navbar flex flex-col items-center bg-[#b3755d] min-h-screen p-6">
        <h1 className="new-post-title text-white text-xl font-semibold mb-4">Novo Post</h1>

        {/* Campo de título */}
        <input
          type="text"
          placeholder="Título do seu post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="post-input w-full max-w-md p-3 bg-[#93593f] text-white rounded-lg mb-4 outline-none"
        />

        {/* Seção de mídia e informações */}
        <div className="rectangle-7 w-full max-w-md bg-[#a35e41] p-4 rounded-lg flex items-center gap-4 mb-4">
          <div className="rectangle-10 w-20 h-24 bg-gray-500 rounded-md"></div>
          <div className="flex flex-col gap-2 flex-1">
            <button className="rectangle-11 w-full bg-[#e1a24b] py-2 rounded-lg text-white">Opção 1</button>
            <button className="rectangle-12 w-full bg-[#e1a24b] py-2 rounded-lg text-white">Opção 2</button>
            <div className="flex gap-1">
              {/* Adicionar conteúdo aqui, se necessário */}
            </div>
          </div>
        </div>

        {/* Campo de texto */}
        <textarea
          placeholder="Escreva..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="write-text w-full max-w-md h-32 p-3 bg-[#93593f] text-white rounded-lg mb-4 outline-none"
        ></textarea>

        {/* Botão Publicar */}
        <button className="publish-button flex items-center justify-between w-full max-w-md bg-[#a35e41] text-white py-3 px-6 rounded-lg font-semibold">
          Publicar
        </button>
      </div>
    </div>
  );
}