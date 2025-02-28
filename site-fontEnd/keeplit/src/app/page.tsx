// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import { FiSearch } from "react-icons/fi";
import { setupAPIClient } from './services/api';

interface Autor {
  id: number;
  nomeUsuario: string;
  fotoPerfil: string | null;
}

interface Post {
  id: number;
  titulo: string;
  texto: string;
  livro: string;
  nota: number;
  imagem: string | null;
  autor: Autor;
}

const axios = setupAPIClient();

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<Autor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, userResponse] = await Promise.all([
          axios.get<Post[]>('/posts'),
          (async () => {
            try {
              const response = await axios.get<Autor>('/usuarios/me');
              return response.data;
            } catch (error) {
              return null;
            }
          })()
        ]);

        const processedPosts = postsResponse.data.map(post => {
          // Sanitização robusta da URL da imagem
          const sanitizeImageUrl = (url: string | null) => {
            if (!url) return null;

            const cleaned = url
              .replace(/^[\x00-\x20]+/, '')  // Remove caracteres de controle no início
              .replace(/[\x00-\x20]+$/, '')  // Remove caracteres de controle no final
              .trim();

            return cleaned.length > 0 ? cleaned : null;
          };

          return {
            ...post,
            imagem: sanitizeImageUrl(post.imagem),
            autor: {
              ...post.autor,
              fotoPerfil: sanitizeImageUrl(post.autor.fotoPerfil)
            }
          };
        });

        setPosts(processedPosts);

        if (userResponse) {
          setUser({
            ...userResponse,
            fotoPerfil: userResponse.fotoPerfil?.trim() || null
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const searchText = searchTerm.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(searchText) ||
      post.texto.toLowerCase().includes(searchText) ||
      post.livro.toLowerCase().includes(searchText) ||
      post.autor.nomeUsuario.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="flex flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">
      <Sidebar />

      <div className="flex flex-col grow gap-4 p-4 h-screen overflow-y-scroll pb-24 xl:pb-4">
        <div className="border-2 rounded-3xl border-black flex flex-row flex-nowrap items-center gap-2 p-2">
          <FiSearch color="black" className="w-8 h-8" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-[#F8EEE3] text-black w-full p-2 rounded-2xl focus:outline-none text-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPosts.reverse().map((post: Post) => (
          <Postcard
            key={post.id}
            id={post.id}
            titulo={post.titulo}
            texto={post.texto}
            livro={post.livro}
            nota={post.nota}
            imagem={post.imagem}
            autor={post.autor}
          />
        ))}
      </div>

      <Criaposts />
    </main>
  );
}
