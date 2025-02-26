import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import { get } from "http";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

const axios = require('axios');

async function getPosts() {
  try {
    const response = await axios.get('http://localhost:8080/posts');
    return (response.data);
  } catch (error) {
    console.error(error);
  }
}
async function getUsers() {
  try {
    const response = await axios.get('http://localhost:8080/usuarios');
    return (response.data);
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  let posts = await getPosts();
  let users = await getUsers();
  console.log(users);
  console.log(posts);

  return (
    <main className="flex flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">

      <Sidebar caminhoimagem={"data:image/png;base64," + users[3].fotoPerfil} nomeusuario={users[3].nomeUsuario} />
      <div className="flex flex-col grow gap-4 p-4 h-screen overflow-y-scroll pb-24 xl:pb-4">
        <div className="border-2 rounded-3xl border-black  flex flex-row flex-nowrap items-center gap-2 p-2">
          <FiSearch color="black" className="w-8 h-8" />
          <input type="text" placeholder="Pesquisar" className=" bg-[#F8EEE3] text-black w-full p-2   rounded-2xl focus:outline-none text-2xl" />
        </div>
        {posts.map((post: { nomeusuario: string; perfil: string; capa: string; titulo: string; titulolivro: string; rating: number; descricao: string; id: number }) => (

          <Postcard key={post.id} nomeusuario={post.nomeusuario} perfil={post.perfil} capa={post.capa} titulo={post.titulo} titulolivro={post.titulolivro} rating={post.rating} descricao={post.descricao} />
        ))}

      </div>
      <Criaposts />

    </main>
  );
}
