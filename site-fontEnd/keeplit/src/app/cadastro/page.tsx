'use client';
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import router from 'next/router';

type FormState = {
  nomeUsuario: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  fotoPerfil?: string;
};

const CadastroPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    nomeUsuario: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, fotoPerfil: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Validação dos campos
      if (!formData.nomeUsuario || !formData.email || !formData.senha) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      if (formData.senha !== formData.confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      const jsonData = {
        nomeUsuario: formData.nomeUsuario,
        email: formData.email,
        senha: formData.senha,
        fotoPerfil: formData.fotoPerfil
      };

      const response = await axios.post('/api/usuarios', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Reset do formulário após sucesso
      setFormData({
        nomeUsuario: '',
        email: '',
        senha: '',
        confirmarSenha: ''
      });
      setImagePreview(null);

      alert('Usuário cadastrado com sucesso:');
      router.push('/login');

    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Erro ao cadastrar usuário');
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-poppins">
      <div className="w-[67.5%] max-w-[1034px] flex flex-col items-center justify-center bg-[#709A7C] rounded-[22.5px] p-8 shadow-[0_3px_15px_rgba(0,0,0,0.25)]">
        <h1 className="text-white text-center text-[3.375rem] font-normal mb-4" style={{ textShadow: '0 3px 3px rgba(0,0,0,0.25)' }}>
          KeepLit
        </h1>

        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
          <div className="w-full max-w-[390.75px] mb-8">
            <input
              type="text"
              id="username"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleInputChange}
              placeholder="Usuário"
              required
              className="w-full h-[45px] border-2 border-[#709A7C] rounded-[26.25px] text-[1.3125rem] px-6 text-[#E2AC59] placeholder:text-[#E2AC59] bg-[#F8EEE3] font-inter"
            />
          </div>

          <div className="w-full max-w-[390.75px] mb-8">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              className="w-full h-[45px] border-2 border-[#709A7C] rounded-[26.25px] text-[1.3125rem] px-6 text-[#E2AC59] placeholder:text-[#E2AC59] bg-[#F8EEE3] font-inter"
            />
          </div>

          <div className="w-full max-w-[390.75px] mb-8">
            <input
              type="password"
              id="password"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              placeholder="Senha"
              required
              className="w-full h-[45px] border-2 border-[#709A7C] rounded-[26.25px] text-[1.3125rem] px-6 text-[#E2AC59] placeholder:text-[#E2AC59] bg-[#F8EEE3] font-inter"
            />
          </div>

          <div className="w-full max-w-[390.75px] mb-8">
            <input
              type="password"
              id="confirm-password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              placeholder="Confirmar Senha"
              required
              className="w-full h-[45px] border-2 border-[#709A7C] rounded-[26.25px] text-[1.3125rem] px-6 text-[#E2AC59] placeholder:text-[#E2AC59] bg-[#F8EEE3] font-inter"
            />
          </div>

          <div className="w-full max-w-[390.75px] mb-8 flex flex-col items-center">
            <label className="w-full h-[45px] relative cursor-pointer">
              <span className="absolute inset-0 bg-[#709A7C] text-white rounded-[26.25px] flex items-center justify-center text-[1.3125rem] border-2 border-white">
                Escolher arquivo
              </span>
              <input
                type="file"
                id="image"
                name="fotoPerfil"
                accept="image/*"
                onChange={handleImageChange}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </label>

            {imagePreview && (
              <div
                className="w-[330px] h-[165px] border-2 border-[#709A7C] rounded-full bg-cover bg-center mt-4"
                style={{ backgroundImage: `url(${imagePreview})` }}
              />
            )}
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4 text-lg">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[411.75px] bg-[#A35636] text-white rounded-[26.25px] text-[1.3125rem] py-3 hover:bg-[#8a452a] transition-colors disabled:opacity-50"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPage;
