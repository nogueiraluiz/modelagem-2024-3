
import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import { FiSearch } from "react-icons/fi";
import { setupAPIClient } from './services/api';


const axios = setupAPIClient();

async function getPosts() {

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
  const posts = await getPosts();
  const users = await getUsers();
  console.log(users);
  console.log(posts);

  return (
    <main className="flex flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">

      <Sidebar
        caminhoimagem={`data:image/png;base64,${users[3].fotoPerfil.trim()}`}
        nomeusuario={users[3].nomeUsuario}
      />
      <div className="flex flex-col grow gap-4 p-4 h-screen overflow-y-scroll pb-24 xl:pb-4">
        <div className="border-2 rounded-3xl border-black  flex flex-row flex-nowrap items-center gap-2 p-2">
          <FiSearch color="black" className="w-8 h-8" />
          <input type="text" placeholder="Pesquisar" className=" bg-[#F8EEE3] text-black w-full p-2   rounded-2xl focus:outline-none text-2xl" />
        </div>
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
      <Criaposts />

    </main>
  );
}