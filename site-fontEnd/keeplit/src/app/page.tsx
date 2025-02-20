import Criaposts from "@/components/ui/criapost";
import Sidebar from "@/components/ui/sidebar";


export default function Home() {
  return (
    <main className="flex flex-row flex-nowrap justify-start items-start">
      <Sidebar caminhoimagem="/logo.svg" nomeusuario="lele" />
      <div className="grow m-0 p-0"></div>
      <Criaposts />
    
    </main>

  );
}
