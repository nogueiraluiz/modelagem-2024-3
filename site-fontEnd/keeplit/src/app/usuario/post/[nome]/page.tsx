"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/sidebar";
import Criaposts from "@/components/ui/criapost";
import { setupAPIClient } from "@/app/services/api";
import { FaArrowCircleLeft } from "react-icons/fa";

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
  userimg?: string;
}

const UserProfile = ({ name, id, userimg }: UserProfileProps) => {
  const cleanUserImg = userimg?.replace(/[\x00-\x1F]/g, '')?.trim();
  const imageSrc = cleanUserImg || "/logo.svg";

  return (
    <div className="flex flex-col items-center gap-4">
      <a href={`/perfil/${id}`} className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
          <Image
            src={imageSrc}
            width={64}
            height={64}
            alt={name}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h2 className="text-lg text-center font-medium text-white" aria-label="Nome do usuário">
          {name}
        </h2>
      </a>
    </div>
  );
};

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

  const cleanBookImage = post.imagem?.replace(/[\x00-\x1F]/g, '')?.trim();
  const bookImageSrc = cleanBookImage || "/logo.svg";

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex flex-1 flex-col gap-4 p-4">
        <header className="mx-auto flex w-full items-center justify-between rounded-[31.5px] bg-[#709A7C] px-9 py-4">
          <div className="flex flex-col items-center">
            <UserProfile
              name={post.autor.nomeUsuario}
              id={post.autor.id}
              userimg={post.autor.fotoPerfil}
            />
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
            <Image
              width={110}
              height={200}
              alt={post.titulo}
              src={bookImageSrc}
              className="rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.svg";
              }}
            />
            <h2 className="text-center text-xl font-bold text-[#2E2E2E]">{post.livro}</h2>
            <p className="text-center italic text-[#6D6D6D]">{post.autoresLivro.join(', ')}</p>
            <a href="/" className="mt-5 flex h-[20%] w-full items-center justify-between rounded-[26.25px] bg-[#709A7C] px-2">
              <h3 className="pl-2 font-poppins text-sm font-semibold uppercase tracking-wide text-white">FEED</h3>
              <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center">
                <FaArrowCircleLeft color="#709A7C" size={24} />
              </div>
            </a>
          </aside>
        </section>
      </main>

      <Criaposts />
    </div>
  );
}
