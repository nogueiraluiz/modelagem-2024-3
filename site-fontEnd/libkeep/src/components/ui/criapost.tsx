import Image from "next/image";
import Title from "../text/title";
import React, { useState } from "react";

export default function Criaposts() {
    return (
        <aside className="h-screen w-[450px] bg-bgmarrom text-white flex flex-col items-center justify-between p-4">
            <Title title="Novo Post" />
            <input type="text" placeholder="Titulo" className="w-full p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl" />
            <div>
                <div>
                    <input type="file" className="hidden" />
                </div>
                <div></div>
            </div>
        </aside>
    )
}