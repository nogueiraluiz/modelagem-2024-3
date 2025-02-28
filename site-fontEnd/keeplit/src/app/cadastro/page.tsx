"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setupAPIClient } from '../services/api';

const axios = setupAPIClient();

const CadastroPage: React.FC = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagem(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('senha', senha);
      if (imagem) {
        formData.append('imagem', imagem);
      }

      await axios.post('/usuarios/cadastro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/login');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Erro ao cadastrar. Tente novamente.');
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white font-poppins text-black">
      <div className="w-90 max-w-[1379px] h-auto bg-primary-green rounded-3xl bg-verde p-10 shadow-lg flex flex-col items-center justify-center
        md:p-5">
        <h1 className="text-[4.5rem] text-white text-center mb-5 font-normal [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] 
          md:text-[3.5rem]">KeepLit</h1>

        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
          <div className="w-full max-w-[521px] mb-10">
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
              disabled={loading}
              className="w-full h-[60px] border-3 border-primary-green rounded-[35px] text-[1.75rem] px-[30px] text-accent-gold 
                font-inter bg-secondary-beige placeholder:text-accent-gold focus:outline-none
                md:h-[50px] md:text-[1.5rem]"
            />
          </div>

          <div className="w-full max-w-[521px] mb-10">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              disabled={loading}
              className="w-full h-[60px] border-3 border-primary-green rounded-[35px] text-[1.75rem] px-[30px] text-accent-gold 
                font-inter bg-secondary-beige placeholder:text-accent-gold focus:outline-none
                md:h-[50px] md:text-[1.5rem]"
            />
          </div>

          <div className="w-full max-w-[521px] mb-10">
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required
              disabled={loading}
              className="w-full h-[60px] border-3 border-primary-green rounded-[35px] text-[1.75rem] px-[30px] text-accent-gold 
                font-inter bg-secondary-beige placeholder:text-accent-gold focus:outline-none
                md:h-[50px] md:text-[1.5rem]"
            />
          </div>

          <div className="w-full max-w-[521px] mb-10">
            <label className="custom-file-upload">
              <input
                type="file"
                id="imagem"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
                className="hidden-file-input"
              />
              <span className="file-button">
                {imagePreview ? 'Imagem Selecionada' : 'Escolher Imagem'}
              </span>
            </label>
            {imagePreview && (
              <div
                className="mt-4 w-[100px] h-[100px] bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url(${imagePreview})` }}
              ></div>
            )}
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[549px] h-auto bg-primary-brown bg-amber-600 text-white rounded-[35px] text-[1.75rem] p-[15px] 
              flex items-center justify-center hover:opacity-90 transition-opacity
              md:text-[1.5rem]"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="flex flex-col items-center gap-5 mt-10 w-full">
          <button
            onClick={handleLoginClick}
            disabled={loading}
            className="w-full max-w-[335px] bg-amber-500 h-auto bg-secondary-green text-white rounded-[35px] text-[1.75rem] p-[15px] 
              hover:opacity-90 transition-opacity
              md:text-[1.5rem]"
          >
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;