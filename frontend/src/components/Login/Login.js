import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import api from '../../axiosConfig';
import { saveTokens } from '../../authService';
import { AuthContext } from '../../context/AuthContext';
import olhoAberto from '../../assets/images/olho_aberto.png';
import olhoFechado from '../../assets/images/olho_fechado.png';

import './styles.css';

const Login = ({ onClose, onLoginSuccess  }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
    const modalRef = useRef(); // Ref para o modal

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await api.post('/api/auth/login', { email, senha });
            const { accessToken, refreshToken, nome } = response.data; // Pegue os dois tokens
            saveTokens(accessToken, refreshToken); // Salvar ambos os tokens no localStorage
            const userData = { nome, email };
            login(userData); // Chama a função de login do contexto

            onClose(); // Fecha o formulário de login
            onLoginSuccess();
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="modal-content" ref={modalRef}>
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        autoComplete='on'
                        type="email"
                        id='email'
                        name='email'
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id='password'
                            name='password'
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            className="password-toggle-button"
                            onClick={togglePasswordVisibility}
                        >
                            <img src={showPassword ? olhoFechado : olhoAberto} alt="Mostrar/Ocultar Senha" />
                        </button>
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
