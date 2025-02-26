import React from 'react';
import './styles.css';

const CadastroPage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="image-preview"></div>
      <h1>KeepLit</h1>
      <form className="login-form">
        <div className="form-group">
          <input type="text" id="username" name="username" placeholder="Usuário" required />
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="password" id="password" name="password" placeholder="Senha" required />
        </div>
        <div className="form-group">
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmar Senha" required />
        </div>
        <button type="submit" className="register-button">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
