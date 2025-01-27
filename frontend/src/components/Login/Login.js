import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import api from '../../axiosConfig';
import { saveToken } from '../../authService';
import { AuthContext } from '../../context/AuthContext';

import './styles.css'; 

const Login = ({ onClose }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const modalRef = useRef(); // Ref para o modal

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await api.post('/api/auth/login', { email, senha });
            saveToken(response.data.token); // Salvar token no localStorage
            const userData = { nome: response.data.nome, email };
            login(userData); // Chama a função de login do contexto

            onClose(); // Fecha o formulário de login
        } catch (err) {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    // Função para fechar o modal ao clicar fora dele
    const handleClickOutside = useCallback((event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    // Adiciona o listener de clique fora do modal
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className="login-container">
            <div className="modal-content" ref={modalRef}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
