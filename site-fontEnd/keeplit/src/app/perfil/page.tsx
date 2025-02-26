import Criaposts from "@/components/ui/criapost";
import Postcard from "@/components/ui/postcard";
import Sidebar from "@/components/ui/sidebar";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";



export default function Home() {
    return (
        <main className="flex flex-row flex-nowrap justify-start items-start bg-[#F8EEE3] poppins">
            <Sidebar caminhoimagem="/logo.svg" nomeusuario="lele" />
            <div className="flex flex-col grow gap-4 p-4 h-screen overflow-y-scroll pb-24 xl:pb-4">
                <div className="border-2 rounded-3xl border-black  flex flex-row flex-nowrap items-center gap-2 p-2">
                    <FiSearch color="black" className="w-8 h-8" />
                    <input type="text" placeholder="Pesquisar" className=" bg-[#F8EEE3] text-black w-full p-2   rounded-2xl focus:outline-none text-2xl" />
                </div>
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="Duis esse non non dolor mollit proident id minim mollit. Dolor esse minim consectetur aliqua labore ex enim consectetur ex deserunt. Amet aliqua labore incididunt dolore sunt veniam officia. Dolor magna aliqua eu duis ea elit magna ea incididunt. Consectetur magna sit exercitation labore ad cillum ut ipsum. Non nisi consectetur dolore culpa dolore amet tempor adipisicing fugiat in. Exercitation et excepteur aliqua veniam sit Lorem tempor nisi magna fugiat laborum anim officia nisi." />
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="descricao" />
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="descricao" />
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="descricao" />
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="descricao" />
                <Postcard nomeusuario="lele" perfil="/logo.svg" capa="/logo.svg" titulo="titulo" titulolivro="titulolivro" rating={5} descricao="descricao" />
            </div>
            <Criaposts />
        </main>
    );
}
