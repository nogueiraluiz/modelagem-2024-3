import Image from "next/image";

interface PostcardProps {
    nomeusuario: string;
    perfil: string;
    capa: string;
    titulo: string;
    titulolivro: string;
    rating: number;
    descricao: string;
    id: number;
}

export default function Postcard({ nomeusuario, perfil, capa, titulo, titulolivro, rating, descricao, id }: PostcardProps) {
    return (
        <a href={`/usuario/post/${id}`} className="w-full">
            <div className="bg-verde  text-white p-4 rounded-2xl flex flex-row flex-nowrap gap-4">
                <div className="flex flex-col items-center justify-center w-[130px] gap-4">
                    <Image src={capa} width={110} height={180} alt={"capa do livro" + titulolivro} />
                    <p>{titulolivro}</p>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <div className="flex flex-row flex-nowrap items-center gap-4">
                            <Image src={perfil} width={45} height={45} alt={nomeusuario} />
                            <p>{nomeusuario}</p>
                        </div>
                        <div>
                            {rating}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl">{titulo}</h1>
                        <p className="break-words line-clamp-3 overflow-hidden text-ellipsis">
                            {descricao}
                        </p>
                    </div>
                </div>
            </div>
        </a>

    )
}