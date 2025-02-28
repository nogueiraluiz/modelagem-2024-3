import Postcard from "@/components/ui/postcard";
import Image from "next/image";
import { setupAPIClient } from "@/app/services/api";

interface Post {
    id: number;
    titulo: string;
    texto: string;
    livro: string;
    nota: number;
    imagem: string | null;
    autor: {
        nomeUsuario: string;
        fotoPerfil: string | null;
    };
}

interface User {
    id: number;
    nomeUsuario: string;
    fotoPerfil: string | null;
    posts: Post[];
}

const axios = setupAPIClient();

async function getUsers(userId: string): Promise<User | null> {
    try {
        if (!userId) {
            console.error('ID do usuário não encontrado na URL');
            return null;
        }

        const response = await axios.get(`/usuarios/${userId}`);
        const rawUser = response.data;

        return {
            id: Number(rawUser.id),
            nomeUsuario: rawUser.nomeUsuario || 'Usuário Anônimo',
            fotoPerfil: rawUser.fotoPerfil?.trim() || null,
            posts: (rawUser.posts || []).map((post: any) => ({
                id: Number(post.id),
                titulo: post.titulo || 'Sem título',
                texto: post.texto || '',
                livro: post.livro || 'Livro Desconhecido',
                nota: Number(post.nota) || 0,
                imagem: post.imagem?.trim() || null,
                autor: {
                    nomeUsuario: post.autor?.nomeUsuario || rawUser.nomeUsuario,
                    fotoPerfil: post.autor?.fotoPerfil?.trim() || rawUser.fotoPerfil?.trim() || null
                }
            }))
        };
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

export default async function ProfilePage({ params }: { params: { userId: string } }) {
    const user = await getUsers(params.userId);

    if (!user) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600">Usuário não encontrado</h1>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-[#F8EEE3]">
            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-verde rounded-3xl p-8 shadow-lg mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative w-32 h-32">
                                {user.fotoPerfil ? (
                                    <Image
                                        src={user.fotoPerfil}
                                        alt={`Foto de ${user.nomeUsuario}`}
                                        fill
                                        className="rounded-full object-cover border-4 border-white"
                                        sizes="(max-width: 768px) 100vw, 128px"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-azul-claro rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                        {user.nomeUsuario[0]}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {user.nomeUsuario}
                            </h1>
                        </div>

                        <div className="flex md:flex-row flex-col items-center gap-8 mt-4 md:mt-0">
                            <div className="text-center bg-azul-escuro p-4 rounded-xl">
                                <p className="text-4xl font-black text-white">{user.posts.length}</p>
                                <p className="text-lg text-gray-200">Publicações</p>
                            </div>
                            <a href="/">
                                <div className="text-center bg-orange-400 p-4 rounded-xl">
                                    <Image src="/logo.svg" width={100} height={100} alt="KeepLit" />
                                    <h1 className="text-2xl font-bold text-white">Home</h1>
                                </div>
                            </a>

                        </div>
                    </div>
                </div>

                <section className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {user.posts.length > 0 ? (
                        user.posts.map((post) => (
                            <Postcard
                                key={post.id}
                                {...post}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-xl text-gray-500">
                                Nenhuma publicação encontrada 🎭
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
