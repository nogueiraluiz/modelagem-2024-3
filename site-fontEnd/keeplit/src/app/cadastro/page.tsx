"use client";

import React, { useState } from 'react';
import './styles.css';

const CadastroPage: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="login-container">
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
        <div className="form-group image-upload">
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className="image-preview" style={{ backgroundImage: `url(${imagePreview})` }}></div>
          )}
        </div>
        <button type="submit" className="register-button">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPage;
