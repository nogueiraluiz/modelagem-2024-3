import Image from "next/image";
import Title from "../text/title";
import React, { useState } from "react";
import { BsFileImage } from "react-icons/bs";


export default function Criaposts() {
    return (
        <aside className="h-screen w-[450px] bg-bgmarrom text-white flex flex-col items-center justify-between p-4">
            <Title title="Novo Post" />
            <input type="text" placeholder="Titulo" className="w-full p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl" />
            <div className="flex flex-row flex-nowrap justify-between items-center w-full">
                <div>
                    <label htmlFor="file" className="cursor-pointer bg-[#6D6D6D] p-2 rounded-2xl">
                        <BsFileImage />
                        <Image src={"/logo.svg"} alt={"capa do livro"} width={110} height={180} />
                    </label>
                    <input type="file" id="file" className="hidden" />
                </div>
                <div>
                    <input type="text" className="w-full p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"></input>
                    <input type="text" className="w-full p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"></input>

                </div>
            </div>
        </aside>
    )
}