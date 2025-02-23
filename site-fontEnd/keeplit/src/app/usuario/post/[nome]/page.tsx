'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import './style.css';
import Sidebar from '@/components/ui/sidebar';
import Criaposts from '@/components/ui/criapost';

type StarRatingProps = {
  rating: number;
};

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div
      className="star-rating"
      role="radiogroup"
      aria-label="Avaliação em estrelas"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          aria-label={`Avaliado com ${star} estrelas`}
          aria-checked={star === rating}
          role="radio"
        >
          ★
        </span>
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
  const [rating, setRating] = useState(3);

  const [postData, setPostData] = useState({
    title: '',
    content: ''
  });


  const nome = params.nome?.toString() || 'Usuário';

  return (
    <div className="main-background flex flex-row flex-nowrap justify-start items-start">
      {/* Navbar Esquerda */}
      <Sidebar caminhoimagem="/logo.svg" nomeusuario={nome} />

      {/* Conteúdo Principal */}
      <main className="main-container flex grow">
        <header className="main-header">
          <div className="header-left">
            <UserProfile name={nome?.toString() || 'Usuário'} />
          </div>

          <div className="header-center">
            <h1 className="title-text" aria-label="Título da resenha">Título</h1>
            <StarRating rating={rating} />
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
      <Criaposts />
    </div>
  );
}