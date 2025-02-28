"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';
import { setupAPIClient } from '../services/api';


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
      const response = await axios.post('/usuarios/login', {
        email,
        senha,
      });

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
    <div className="login-container">
      <h1>KeepLit</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Entrar'}
        </button>
      </form>

      <div className="button-container">
        <button
          className="register-button"
          onClick={handleRegisterClick}
          disabled={loading}
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
};

export default LoginPage;