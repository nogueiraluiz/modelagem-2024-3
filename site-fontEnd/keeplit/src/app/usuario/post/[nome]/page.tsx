"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebar";
import Criaposts from "@/components/ui/criapost";
import { setupAPIClient } from "@/app/services/api";

interface Autor {
  id: number;
  nomeUsuario: string;
  email: string;
  fotoPerfil: string;
}

interface Post {
  id: number;
  titulo: string;
  texto: string;
  dataCriacao: string;
  livro: string;
  nota: number;
  autoresLivro: string[];
  imagem: string;
  autor: Autor;
}

interface UsuarioLogadoResponse {
  id: number;
  nomeUsuario: string;
  email: string;
  fotoPerfil: string;
  posts: Post[];
}

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Avaliação em estrelas">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl transition-transform duration-200 ${star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
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

const axios = setupAPIClient();

interface UserProfileProps {
  name: string;
  id: string | number;
}

const UserProfile = ({ name, id }: UserProfileProps) => (
  <div className="flex flex-col items-center gap-4">
    <a href={`/perfil/${id}`}>
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-600 text-2xl font-bold text-white"
        role="img"
        aria-label={`Avatar de ${name}`}
      >
        {name[0]?.toUpperCase()}
      </div>
      <h2 className="text-lg font-medium text-white" aria-label="Nome do usuário">
        {name}
      </h2>
    </a>
  </div>
);

interface PageParams {
  [key: string]: string | string[];
  nome: string;
}

export default function Home() {
  const params = useParams<PageParams>();
  const [rating, setRating] = useState<number>(3);
  const [post, setPost] = useState<Post | null>(null);
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoResponse | null>(null);

  const nome = Array.isArray(params.nome) ? params.nome[0] : params.nome || "Usuário";

  async function getPosts(): Promise<void> {
    try {
      const response = await axios.get<Post>(`/posts/${nome}`);
      setPost(response.data);
      setRating(response.data.nota);
    } catch (error) {
      console.error(error);
    }
  }

  async function getUsuarioLogado(): Promise<void> {
    try {
      const userId = document.cookie.split('=')[1];
      const response = await axios.get<UsuarioLogadoResponse>(`/usuarios/${userId}`);
      setUsuarioLogado(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }


  useEffect(() => {
    getPosts();
    getUsuarioLogado();
  }, [nome]);

  if (!post) {
    return <div className="flex h-screen bg-white items-center justify-center text-2xl">Carregando...</div>;
  }

  const postDate = new Date(post.dataCriacao);
  const formattedDate = postDate.toLocaleDateString('pt-BR');
  const formattedTime = postDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        caminhoimagem={usuarioLogado?.fotoPerfil || ""}
        nomeusuario={usuarioLogado?.nomeUsuario || "Usuário"}
      />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <header className="mx-auto flex w-[95%] items-center justify-between rounded-[31.5px] bg-[#709A7C] px-9 py-4">
          <div className="flex flex-col items-center">
            <UserProfile name={post.autor.nomeUsuario} id={post.autor.id} />
          </div>

          <div className="-mt-5 flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold text-white" aria-label="Título da resenha">
              {post.titulo}
            </h1>
            <StarRating rating={rating} />
          </div>

          <div className="text-right text-white">
            <div className="text-xs opacity-60">{formattedDate}</div>
            <div className="text-xs opacity-60">{formattedTime}</div>
          </div>
        </header>

        <section className="flex h-full gap-5">
          <article className="h-[45%] w-[54%] flex-1 overflow-y-auto rounded-[31.5px] bg-[#EAC690] p-6">
            <p className="text-lg leading-relaxed text-[#1E1E1E]">
              {post.texto}
            </p>
          </article>

          <aside className="flex max-h-[350px] max-w-[300px] flex-col gap-3 p-5" aria-label="Informações do livro">
            <div className="h-[50%] w-[80%] rounded bg-gray-600" role="img" aria-label="Capa do livro" />
            <h2 className="text-center text-xl font-bold text-[#2E2E2E]">{post.livro}</h2>
            <p className="text-center italic text-[#6D6D6D]">{post.autoresLivro.join(', ')}</p>
            <div className="mt-5 flex h-[20%] w-full items-center justify-between rounded-[26.25px] bg-[#709A7C] px-2">
              <h3 className="pl-2 font-poppins text-sm font-semibold uppercase tracking-wide text-white">FEED</h3>
              <div className="h-9 w-9 rounded-full bg-gray-300" />
            </div>
          </aside>
        </section>
      </main>

      <Criaposts />
    </div>
  );
}
