import React from 'react';
import './styles.css';

const LoginPage: React.FC = () => {
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
        <button className="register-button">Cadastrar</button>
      </div>
    </div>
  );
};

export default LoginPage;