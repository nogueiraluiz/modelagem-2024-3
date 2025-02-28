"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Title from "../text/title";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { setupAPIClient } from "@/app/services/api";

interface User {
    id: number;
    nomeUsuario: string;
    fotoPerfil: string;
}

export default function Sidebar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const api = setupAPIClient();

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const handleLogout = () => {
        // Remove o cookie
        document.cookie = 'userid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        // Limpa o estado do usuário
        setUser(null);

        // Redireciona para a tela de login
        router.push('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = getCookie('userid');
                if (!userId) {
                    router.push('/login');
                    return;
                }

                const response = await api.get<User>(`/usuarios/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                router.push('/login');
            }
        };

        fetchUserData();
    }, [router, api]);

    if (!user) {
        return (
            <aside className="hidden xl:flex h-screen max-w-[300px] bg-verde text-white flex-col justify-between">
                <div className="animate-pulse">
                    <div className="h-32 bg-gray-700" />
                    <div className="p-4">
                        <div className="h-16 w-16 rounded-full bg-gray-600" />
                        <div className="h-4 bg-gray-600 mt-2 w-3/4" />
                    </div>
                </div>
            </aside>
        );
    }

    return (
        <aside className="hidden xl:flex h-screen max-w-[300px] bg-verde text-white flex-col justify-between">
            <div>
                <div className="flex flex-row items-center flex-nowrap justify-around p-4">
                    <Image
                        src="/logo.svg"
                        width={100}
                        height={100}
                        alt="KeepLit"
                        priority
                    />
                    <Title title="KeepLit" />
                </div>
                <div className="flex flex-row flex-nowrap justify-start p-4">
                    <div className="flex flex-row flex-nowrap justify-center items-center p-4 gap-3">
                        <Image
                            src={user.fotoPerfil || '/default-avatar.png'}
                            className="rounded-full object-cover"
                            width={55}
                            height={55}
                            alt={user.nomeUsuario}
                        />
                        <p className="text-2xl truncate max-w-[150px]">
                            {user.nomeUsuario}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="mb-10 flex flex-row flex-nowrap justify-start items-center p-8 gap-3 hover:bg-verde-escuro transition-colors cursor-pointer w-full"
                aria-label="Sair da conta"
            >
                <FaArrowAltCircleLeft className="w-11 h-11" />
                <p className="text-2xl">Logout</p>
            </button>
        </aside>
    );
}
