import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import { FiSearch } from "react-icons/fi";
import { setupAPIClient } from "../services/api";
import Image from "next/image";

const axios = setupAPIClient();
async function getPostsUser() {

    try {
        const response = await axios.get('/posts');
        return (response.data);
    } catch (error) {
        console.error(error);
    }
}
async function getUsers() {
    try {
        const response = await axios.get('/usuarios');
        return (response.data);
    } catch (error) {
        console.error(error);
    }
}

export default async function Home() {
    const posts = await getPostsUser();
    const users = await getUsers();
    console.log(users);
    console.log(posts);

    return (
        <main className="w-full">
            <div className="flex max-w-[100vw] flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">
                <div className="bg-verde w-full flex flex-row flex-nowrap justify-between items-center p-6 m-8 rounded-3xl">
                    <div className="flex flex-row flex-nowrap items-center gap-2">
                        <Image src={`data:image/png;base64,${users[0].fotoPerfil.trim()}`} alt="foto de perfil" width={200} height={200} />
                        <h1 className="text-3xl">{users[0].nomeUsuario}</h1>
                    </div>
                    <div className="flex flex-row flex-nowrap items-center gap-16">
                        <div className="text-center text-3xl">
                            <h1 className="font-black text-7xl">{users[0].posts.length}</h1>
                            <h1>Publicações</h1>
                        </div>
                        <a href="/" className="flex flex-col items-center">
                            <div className="flex flex-col items-center gap-4 bg-[#EBC895] p-4 rounded-3xl">
                                <h1 className="text-3xl">Feed</h1>
                                <Image src="/logo.svg" alt="foto de perfil" width={170} height={170} />
                            </div>
                        </a>
                    </div>
                </div>

            </div>
            <div className="p-10 flex flex-col flex-nowrap itens-center gap-4 bg-[#F8EEE3] poppins">
                {Array.isArray(posts) && posts.map((post) => (
                    <Postcard
                        key={post.id}
                        id={post.id}
                        nomeusuario={post.nomeusuario}
                        perfil={post.perfil}
                        capa={post.capa}
                        titulo={post.titulo}
                        titulolivro={post.titulolivro}
                        rating={post.rating}
                        descricao={post.descricao}
                    />
                ))}
            </div>

        </main>
    );
}
