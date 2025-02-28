import Postcard from "@/components/ui/postcard";
import Image from "next/image";
import { setupAPIClient } from "@/app/services/api";
import { cookies } from 'next/headers';

// Interfaces TypeScript
interface User {
    id: number;
    nomeUsuario: string;
    fotoPerfil: string;
    posts: Post[];
}

interface Post {
    id: number;
    nomeusuario: string;
    perfil: string;
    capa: string;
    titulo: string;
    titulolivro: string;
    rating: number;
    descricao: string;
}

const axios = setupAPIClient();

async function getPostsUser(): Promise<Post[]> {
    try {
        const response = await axios.get<Post[]>('/posts');
        return response.data.map(post => ({
            ...post,
            id: Number(post.id)
        }));
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return [];
    }
}

async function getUsers(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userid')?.value;

        if (!userId) {
            console.error('ID do usuário não encontrado nos cookies');
            return null;
        }

        const response = await axios.get<User>(`/usuarios/${Number(userId)}`);
        return {
            ...response.data,
            id: Number(response.data.id),
            posts: response.data.posts.map(post => ({
                ...post,
                id: Number(post.id)
            }))
        };
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

export default async function ProfilePage() {
    const [posts, user] = await Promise.all([
        getPostsUser(),
        getUsers()
    ]);

    if (!user) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600">Usuário não autenticado</h1>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-[#F8EEE3]">
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-verde rounded-3xl p-8 shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32">
                                <Image
                                    src={user.fotoPerfil}
                                    alt="Foto de perfil"
                                    fill
                                    className="rounded-full object-cover border-4 border-white"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {user.nomeUsuario}
                            </h1>
                        </div>

                        <div className="flex md:flex-row flex-col items-center gap-8">
                            <div className="text-center">
                                <p className="text-7xl font-black text-white">
                                    {user.posts.length}
                                </p>
                                <p className="text-xl text-gray-600">Publicações</p>
                            </div>

                            <a
                                href="/"
                                className="bg-orange-400 hover:bg-amber-200 transition-colors p-6 rounded-2xl shadow-md"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">Feed</h2>
                                    <div className="relative w-24 h-24">
                                        <Image
                                            src="/logo.svg"
                                            alt="Logo do Feed"
                                            fill
                                            className="hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-12 grid gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Postcard
                                key={post.id}
                                {...post}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-500">
                                Nenhuma publicação encontrada
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
