"use client";
import React, { useState, useContext } from 'react';
import './styles.css';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';



const LoginPage: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading] = useState(false);
  const [error, setError] = useState('');

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  //  setLoading(true);
    setError('');

   
    if(email === '' || password === ''){
      toast.warning('Fill in all fields');
      return;
    }


    const data = {
      email,
      password
    };

    await signIn(data);

    

  }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
   

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
            value={password}
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
         // onClick={handleRegisterClick}
          disabled={loading}
        >
          Criar nova conta
        </button>
      </div>
    </div>
  );
};

export default LoginPage;