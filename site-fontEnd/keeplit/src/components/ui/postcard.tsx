// components/ui/postcard.tsx
import Image from "next/image";

interface Autor {
    nomeUsuario: string;
    fotoPerfil: string | null;
}

interface PostcardProps {
    id: number;
    titulo: string;
    texto: string;
    livro: string;
    nota: number;
    imagem: string | null;
    autor: Autor;
}

export default function Postcard(props: PostcardProps) {
    return (
        <a href={`/usuario/post/${props.id}`} className="w-full">
            <div className="bg-verde text-white p-4 rounded-2xl flex flex-row flex-nowrap gap-4">
                <div className="flex flex-col items-center justify-center w-[130px] gap-4">
                    {props.imagem ? (
                        <Image
                            src={props.imagem}
                            width={110}
                            height={180}
                            alt={`Capa do livro ${props.livro}`}
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-[110px] h-[180px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Sem capa</span>
                        </div>
                    )}
                    <p className="text-center">{props.livro}</p>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <div className="flex flex-row flex-nowrap items-center gap-4">
                            {props.autor.fotoPerfil ? (
                                <Image
                                    src={props.autor.fotoPerfil}
                                    width={45}
                                    height={45}
                                    alt={props.autor.nomeUsuario}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-[45px] h-[45px] rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white">{props.autor.nomeUsuario[0]}</span>
                                </div>
                            )}
                            <p>{props.autor.nomeUsuario}</p>
                        </div>
                        <div className="text-xl">
                            {props.nota}/5
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold mb-2">{props.titulo}</h1>
                        <p className="break-words line-clamp-3 overflow-hidden text-ellipsis">
                            {props.texto}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    )
}
