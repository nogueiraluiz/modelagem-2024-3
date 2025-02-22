'use client';
import Image from "next/image";
import Title from "../text/title";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { BsFileImage } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Rating } from 'react-simple-star-rating';

export default function Criaposts() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [rating, setRating] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <aside>
            <form className="h-screen bg-bgmarrom text-white flex flex-col items-center justify-between p-4" action={"https://eoje0c7ntv4t3if.m.pipedream.net"} method="post">
                <Title title="Novo Post" />
                <input
                    type="text"
                    name="titulo"
                    placeholder="Titulo"
                    className="w-full p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"
                    required
                />
                <div className="flex flex-row flex-nowrap justify-between items-center w-full gap-3 bg-marrom p-3 rounded-2xl">
                    <div className="bg-[#6D6D6D] p-2 rounded-2xl h-[200px] w-[118px] flex items-center justify-center relative">
                        <div className="self-start absolute ml-[-90px] mt-[-3px]">
                            {imagePreview && <MdOutlineClose
                                onClick={handleRemoveImage}
                                className="text-white cursor-pointer hover:text-red-500 transition-colors"
                            />}
                        </div>
                        <label htmlFor="file" className="cursor-pointer">
                            {imagePreview ? (
                                <Image
                                    src={imagePreview}
                                    alt={"capa do livro"}
                                    width={110}
                                    height={180}
                                    className="max-w[110px] max-h-[180px] rounded-2xl"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-2 h-full w-full">
                                    <BsFileImage className="text-white text-2xl" />
                                    <span className="text-white text-xs">Adicionar capa</span>
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="capa"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <input
                            type="text"
                            name="nome-livro"
                            placeholder="Título do Livro"
                            className="w-full p-2 my-2 bg-[#E2AC59] placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Autor"
                            name="autor-livro"
                            className="w-full p-2 my-2 bg-[#E2AC59] placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"
                            required
                        />
                        <div className="flex flex-col items-center gap-2 self-center">
                            <Rating
                                onClick={(rate: number) => setRating(rate)}
                                initialValue={rating || 0}
                                size={30}
                                allowFraction={false}
                                fillColor='#E2AC59'
                                emptyColor='#4D4D4D'
                                SVGclassName="inline-block"
                                className="rating-stars"
                            />
                            <input type="hidden" name="nota" value={rating || 0} required />
                        </div>
                    </div>
                </div>
                <textarea
                    name="descricao"
                    placeholder="Escreva sua resenha"
                    className="w-full grow p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-[200px] focus:outline-none text-2xl"
                    required
                >
                </textarea>
                <input type="submit" value="Criar Post" className="w-full p-2 my-2 bg-marrom text-white rounded-2xl min-h-14 focus:outline-none text-2xl cursor-pointer" />
            </form>
        </aside>
    )
}
