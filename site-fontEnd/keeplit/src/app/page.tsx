// app/page.tsx
import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import { FiSearch } from "react-icons/fi";
import { setupAPIClient } from './services/api';
import { cookies } from "next/headers";

// Definir tipos para os dados da API
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

async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>('/posts');
    return response.data.map((post: Post) => ({
      ...post,
      imagem: post.imagem?.trim() || null,
      autor: {
        ...post.autor,
        fotoPerfil: post.autor.fotoPerfil?.trim() || null
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

async function getUsers(): Promise<Autor | null> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userid')?.value;

    if (!userId) return null;

    const response = await axios.get<Autor>(`/usuarios/${userId}`);
    return {
      ...response.data,
      fotoPerfil: response.data.fotoPerfil?.trim() || null
    };
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return null;
  }
}

export default async function Home() {
  const [posts, user] = await Promise.all([getPosts(), getUsers()]);

  return (
    <main className="flex flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">
      <Sidebar
        caminhoimagem={user?.fotoPerfil || ''}
        nomeusuario={user?.nomeUsuario || ''}
      />

      <div className="flex flex-col grow gap-4 p-4 h-screen overflow-y-scroll pb-24 xl:pb-4">
        <div className="border-2 rounded-3xl border-black flex flex-row flex-nowrap items-center gap-2 p-2">
          <FiSearch color="black" className="w-8 h-8" />
          <input
            type="text"
            placeholder="Pesquisar"
            className="bg-[#F8EEE3] text-black w-full p-2 rounded-2xl focus:outline-none text-2xl"
          />
        </div>

        {Array.isArray(posts) && posts.map((post: Post) => (
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
