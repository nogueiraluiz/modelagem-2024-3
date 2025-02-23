import Image from "next/image";
import Title from "../text/title";

interface SidebarProps {
    nomeusuario: string;
    caminhoimagem: string;
}

export default function Sidebar({ nomeusuario, caminhoimagem }: SidebarProps) {
    return (
        <aside className="sidebar h-screen max-w-[300px] bg-verde text-white flex flex-col justify-between">
            <div>
                <div className="flex flex-row items-center flex-nowrap justify-around p-4">
                    <Image src="/logo.svg" width={100} height={100} alt="KeepLit" />
                    <Title title="KeepLit" />
                </div>
                <div className="flex flex-row flex-nowrap justify-start p-4">
                    <div className="flex flex-row flex-nowrap justify-center items-center p-4 gap-3">
                        <Image src={caminhoimagem} width={55} height={55} alt={nomeusuario} />
                        <p className="text-2xl">{nomeusuario}</p>
                    </div>
                </div>
            </div>
            <div className="mb-10 flex flex-row flex-nowrap justify-start items-center p-8 gap-3">
                <Image src="/logo.svg" width={55} height={55} alt={"logout"} />
                <p className="text-xl">Logout</p>
            </div>
        </aside>
    )
}