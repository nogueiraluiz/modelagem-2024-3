'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import './style.css';
import { FaSignOutAlt, FaPaperPlane } from 'react-icons/fa';

type StarRatingProps = {
  rating: number;
  onRate: (rate: number) => void;
};

const StarRating = ({ rating, onRate }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div 
      className="star-rating" 
      role="radiogroup" 
      aria-label="Avaliação em estrelas"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          aria-label={`Avaliar com ${star} estrelas`}
          aria-checked={star === rating}
          role="radio"
        >
          ★
        </button>
      ))}
    </div>
  );
};

const UserProfile = ({ name }: { name: string }) => (
  <div className="user-profile">
    <div 
      className="user-avatar"
      role="img" 
      aria-label={`Avatar de ${name}`}
    >
      {name[0]?.toUpperCase()}
    </div>
    <h2 aria-label="Nome do usuário">{name}</h2>
  </div>
);

export default function Home() {
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [postData, setPostData] = useState({
    title: '',
    content: ''
  });

  // Corrigindo o acesso ao parâmetro da rota
  const nome = params.nome?.toString() || 'Usuário';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Adicionar lógica de envio aqui
    console.log({ ...postData, rating });
    setPostData({ title: '', content: '' });
    setRating(0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPostData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="main-background">
      {/* Navbar Esquerda */}
      <nav className="left-navbar" aria-label="Menu lateral esquerdo">
        <div className="logo" role="heading" aria-level={1}>KeepLit</div>
        <UserProfile name={nome} />
        <button 
          className="logout-button"
          aria-label="Sair da conta"
          onClick={() => console.log('Logout')}
        >
          <FaSignOutAlt aria-hidden="true" />
          Logout
        </button>
      </nav>

      {/* Conteúdo Principal */}
      <main className="main-container">
        <header className="main-header">
          <div className="header-left">
            <UserProfile name={nome?.toString() || 'Usuário'} />
          </div>
          
          <div className="header-center">
            <h1 className="title-text" aria-label="Título da resenha">Título</h1>
            <StarRating rating={rating} onRate={setRating} />
          </div>

          <div className="header-right">
            <time 
              dateTime="2025-01-08T14:00" 
              aria-label="Data e hora da postagem"
            >
              <div className="post-date">08/01/2025</div>
              <div className="post-time">14:00</div>
            </time>
          </div>
        </header>

        <section className="content-wrapper" aria-labelledby="conteudo-principal">
          <h2 id="conteudo-principal" className="sr-only">Conteúdo Principal</h2>
          
          <article className="content-box">
            <p className="body-text">
              Entra no mundo brutal, mágico e envolvente de uma escola de elite para cavaleiros de dragões...
            </p>
          </article>

          <aside className="book-section" aria-label="Informações do livro">
            <div className="rectangle-3" role="img" aria-label="Capa do livro"></div>
            <h2 className="book-title">Título do Livro</h2>
            <p className="book-author">Autor</p>
            <div className="rectangle-16">
              <h3 className="feed-title">FEED</h3>
              <div className="ellipse-4" aria-hidden="true"></div>
            </div>
          </aside>
        </section>
      </main>

      {/* Navbar Direita */}
      <aside className="right-navbar flex flex-col items-center bg-[#b3755d] min-h-screen p-6">
        <h2 className="new-post-title text-white text-xl font-semibold mb-4">
          Novo Post
        </h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            name="title"
            placeholder="Título do seu post"
            value={postData.title}
            onChange={handleInputChange}
            className="post-input w-full p-3 bg-[#93593f] text-white rounded-lg mb-4 outline-none"
            aria-required="true"
            required
          />

          <div 
            className="rectangle-7 w-full bg-[#a35e41] p-4 rounded-lg flex items-center gap-4 mb-4"
            role="group"
            aria-label="Opções de mídia"
          >
            <div className="rectangle-10 w-20 h-24 bg-gray-500 rounded-md" 
                 role="img" 
                 aria-label="Pré-visualização da mídia">
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <button 
                type="button"
                className="rectangle-11 w-full bg-[#e1a24b] py-2 rounded-lg text-white"
              >
                Opção 1
              </button>
              <button 
                type="button"
                className="rectangle-12 w-full bg-[#e1a24b] py-2 rounded-lg text-white"
              >
                Opção 2
              </button>
            </div>
          </div>

          <textarea
            name="content"
            placeholder="Escreva..."
            value={postData.content}
            onChange={handleInputChange}
            className="write-text w-full h-32 p-3 bg-[#93593f] text-white rounded-lg mb-4 outline-none"
            aria-required="true"
            required
          />

          <button 
            type="submit" 
            className="publish-button flex items-center justify-between w-full bg-[#a35e41] text-white py-3 px-6 rounded-lg font-semibold"
          >
            <FaPaperPlane aria-hidden="true" />
            Publicar
          </button>
        </form>
      </aside>
    </div>
  );
}