// components/ui/postcard.tsx
import Image from "next/image";

interface PostcardProps {
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

export default function Postcard({ id, titulo, texto, livro, nota, imagem, autor }: PostcardProps) {
    return (
        <a href={`/usuario/post/${id}`} className="w-full">
            <div className="bg-verde text-white p-4 rounded-2xl flex flex-row flex-nowrap gap-4">
                <div className="flex flex-col items-center justify-center w-[130px] gap-4">
                    {imagem ? (
                        <Image
                            src={imagem}
                            width={110}
                            height={180}
                            alt={`Capa do livro ${livro}`}
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-[110px] h-[180px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">Sem capa</span>
                        </div>
                    )}
                    <p className="text-center">{livro}</p>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <div className="flex flex-row flex-nowrap items-center gap-4">
                            {autor.fotoPerfil ? (
                                <Image
                                    src={autor.fotoPerfil}
                                    width={45}
                                    height={45}
                                    alt={autor.nomeUsuario}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-[45px] h-[45px] rounded-full bg-blue-500 flex items-center justify-center">
                                    <span className="text-white">{autor.nomeUsuario[0]}</span>
                                </div>
                            )}
                            <p>{autor.nomeUsuario}</p>
                        </div>
                        <div className="text-xl">
                            {nota}/5
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold mb-2">{titulo}</h1>
                        <p className="break-words line-clamp-3 overflow-hidden text-ellipsis">
                            {texto}
                        </p>
                    </div>
                </div>
            </div>
        </a>
    )
}
