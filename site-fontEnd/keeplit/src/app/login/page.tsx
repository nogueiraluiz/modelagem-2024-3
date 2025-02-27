"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push('/cadastro');
  };

  return (
    <div className="login-container">
      <h1>KeepLit</h1>
      <form className="login-form">
        <div className="form-group">
          <input type="text" id="username" name="username" placeholder="Usuário" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="Senha" required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="button-container">
        <button className="register-button" onClick={handleRegisterClick}>Cadastrar</button>
      </div>
    </div>
  );
};

export default LoginPage;