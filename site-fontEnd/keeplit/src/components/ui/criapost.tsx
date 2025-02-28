'use client';
import Image from "next/image";
import Title from "../text/title";
import React, { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { BsFileImage } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Rating } from 'react-simple-star-rating';
import { FaUserAlt, FaHome } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import ReactDOM from 'react-dom';
import axios from 'axios';

type FormState = {
    titulo: string;
    livro: string;
    autor: string;
    texto: string;
    nota: number;
    imagem?: string;
};

const OriginalForm = React.memo(({
    formData,
    handleInputChange,
    handleSubmit,
    imagePreview,
    handleRemoveImage,
    handleFileChange,
    fileInputRef,
    loading,
    errorMessage
}: {
    formData: FormState;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    imagePreview: string | null;
    handleRemoveImage: () => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    loading: boolean;
    errorMessage: string;
}) => (
    <form className="xl:flex h-full bg-bgmarrom text-white flex-col items-center justify-between p-4"
        onSubmit={handleSubmit}>

        <Title title="Novo Post" />

        <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            placeholder="Título"
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
                            alt="capa do livro"
                            width={110}
                            height={180}
                            className="max-w[110px] max-h-[180px] rounded-2xl"
                            priority
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
                />
            </div>
            <div className="flex flex-col gap-2 flex-1">
                <input
                    type="text"
                    name="nome-livro"
                    value={formData.livro}
                    onChange={handleInputChange}
                    placeholder="Título do Livro"
                    className="w-full p-2 my-2 bg-[#E2AC59] placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"
                    required
                />
                <input
                    type="text"
                    name="autor-livro"
                    value={formData.autor}
                    onChange={handleInputChange}
                    placeholder="Autor"
                    className="w-full p-2 my-2 bg-[#E2AC59] placeholder:text-white rounded-2xl min-h-14 focus:outline-none text-2xl"
                    required
                />
                <div className="flex flex-col items-center gap-2 self-center">
                    <Rating
                        onClick={(rate: number) => handleInputChange({
                            target: {
                                name: 'nota',
                                value: rate.toString()
                            }
                        } as any)}
                        initialValue={formData.nota}
                        size={30}
                        allowFraction={false}
                        fillColor='#E2AC59'
                        emptyColor='#4D4D4D'
                        SVGclassName="inline-block"
                        className="rating-stars"
                    />
                </div>
            </div>
        </div>
        <textarea
            name="texto"
            value={formData.texto}
            onChange={handleInputChange}
            placeholder="Escreva sua resenha"
            className="w-full grow p-2 my-2 bg-marrom placeholder:text-white rounded-2xl min-h-[200px] focus:outline-none text-2xl"
            required
        />
        {errorMessage && (
            <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
        )}
        <input
            type="submit"
            value={loading ? "Enviando..." : "Criar Post"}
            disabled={loading}
            className="w-full p-2 my-2 bg-marrom text-white rounded-2xl min-h-14 focus:outline-none text-2xl cursor-pointer hover:bg-[#4D4D4D] transition-colors disabled:opacity-50"
        />
    </form>
));

const Modal = React.memo(({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.createElement('div');
        document.body.appendChild(element);
        setPortalElement(element);
        return () => { document.body.removeChild(element) };
    }, []);

    return portalElement ? ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
            onClick={onClose}>
            <div className="bg-bgmarrom rounded-2xl p-4 w-full max-w-lg mx-4 relative h-[90vh]"
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-red-500">
                    ×
                </button>
                <div className="overflow-y-auto h-full p-2">
                    {children}
                </div>
            </div>
        </div>,
        portalElement
    ) : null;
});

export default function Criaposts() {
    const [formData, setFormData] = useState<FormState>({
        titulo: '',
        livro: '',
        autor: '',
        texto: '',
        nota: 0
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const checkMobile = useCallback(() => setIsMobile(window.innerWidth < 1280), []);

    useEffect(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [checkMobile]);

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name === 'nome-livro' ? 'livro' :
                name === 'autor-livro' ? 'autor' :
                    name]: name === 'nota' ? Number(value) : value
        }));
    }, []);

    const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleRemoveImage = useCallback(() => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    const getCookie = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const userId = getCookie('userid');

            const jsonData = {
                titulo: formData.titulo,
                texto: formData.texto,
                nota: formData.nota,
                autoresLivro: [formData.autor],
                livro: formData.livro,
                imagem: imagePreview
            };

            const response = await axios.post('/api/posts', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Usuario-Id': userId || ''
                }
            });

            setFormData({
                titulo: '',
                livro: '',
                autor: '',
                texto: '',
                nota: 0
            });
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

            if (isMobile) setShowModal(false);

            console.log('Post criado com sucesso:', response.data);

        } catch (error) {
            console.error('Erro ao criar post:', error);
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || 'Erro ao criar post. Tente novamente.');
            } else {
                setErrorMessage('Erro inesperado ao criar post.');
            }
        } finally {
            setLoading(false);
        }
    }, [formData, imagePreview, isMobile]);

    return (
        <div>
            <aside className="h-screen hidden xl:block">
                <OriginalForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    imagePreview={imagePreview}
                    handleRemoveImage={handleRemoveImage}
                    handleFileChange={handleFileChange}
                    fileInputRef={fileInputRef}
                    loading={loading}
                    errorMessage={errorMessage}
                />
            </aside>

            {isMobile && (
                <>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <OriginalForm
                                formData={formData}
                                handleInputChange={handleInputChange}
                                handleSubmit={handleSubmit}
                                imagePreview={imagePreview}
                                handleRemoveImage={handleRemoveImage}
                                handleFileChange={handleFileChange}
                                fileInputRef={fileInputRef}
                                loading={loading}
                                errorMessage={errorMessage}
                            />
                        </Modal>
                    )}
                    <div className="xl:hidden fixed bg-marrom w-screen bottom-0 right-0 p-4 flex flex-row flex-nowrap justify-around items-center text-white text-2xl rounded-t-2xl z-[9998]">
                        <FaUserAlt className="sm:w-[50px] sm:h-[50px] w-10 h-10" />
                        <FaHome className="sm:w-[50px] sm:h-[50px] w-10 h-10" />
                        <FaCirclePlus
                            className="sm:w-[50px] sm:h-[50px] w-10 h-10 cursor-pointer hover:text-[#E2AC59]"
                            onClick={() => setShowModal(true)}
                        />
                        <RiLogoutBoxFill className="sm:w-[50px] sm:h-[50px] w-10 h-10" />
                    </div>
                </>
            )}
        </div>
    );
}
