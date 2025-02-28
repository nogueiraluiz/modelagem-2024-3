"use client";

import { useEffect, useState, useMemo } from "react";
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
    const api = useMemo(() => setupAPIClient(), []);

    const getCookie = (name: string): string | undefined => {
        if (typeof window === "undefined") return;
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(`${name}=`))
            ?.split('=')[1];
    };

    const handleLogout = () => {
        document.cookie = 'userid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
        router.push('/login');
    };

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            try {
                const userId = getCookie('userid');
                if (!userId) {
                    router.push('/login');
                    return;
                }

                const response = await api.get<User>(`/usuarios/${userId}`);
                if (isMounted) setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
                if (isMounted) router.push('/login');
            }
        };

        fetchUserData();
        return () => { isMounted = false };
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
                    <a href={`/perfil/${user.id}`} className="flex flex-col items-center gap-2">
                        <div className="flex flex-row flex-nowrap justify-center items-center p-4 gap-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                                <Image
                                    src={user.fotoPerfil?.trim() || '/logo.svg'}
                                    className="object-cover"
                                    width={75}
                                    height={75}
                                    alt={user.nomeUsuario}
                                />
                            </div>
                            <p className="text-2xl truncate max-w-[150px]">
                                {user.nomeUsuario}
                            </p>
                        </div>
                    </a>
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
