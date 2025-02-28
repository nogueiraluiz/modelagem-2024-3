"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setupAPIClient } from '../services/api';
import Cookies from 'js-cookie';

const axios = setupAPIClient();
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/usuarios/login', { email, senha });
      document.cookie = `userid=${response.data.id}; path=/`;
      router.push('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('E-mail ou senha incor');
    }
  };

  const handleRegisterClick = () => {
    router.push('/cadastro');
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
              id="password"
              value={senha}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
              disabled={loading}
              className="w-full h-[60px] border-3 border-primary-green rounded-[35px] text-[1.75rem] px-[30px] text-accent-gold 
                font-inter bg-secondary-beige placeholder:text-accent-gold focus:outline-none
                md:h-[50px] md:text-[1.5rem]"
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[549px] h-auto bg-primary-brown bg-amber-600 text-white rounded-[35px] text-[1.75rem] p-[15px] 
              flex items-center justify-center hover:opacity-90 transition-opacity
              md:text-[1.5rem]">
            {loading ? 'Processando...' : 'Entrar'}
          </button>
        </form>

        <div className="flex flex-col items-center gap-5 mt-10 w-full">
          <button
            onClick={handleRegisterClick}
            disabled={loading}
            className="w-full max-w-[335px] bg-amber-500 h-auto bg-secondary-green text-white rounded-[35px] text-[1.75rem] p-[15px] 
              hover:opacity-90 transition-opacity
              md:text-[1.5rem]">
            Criar nova conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
