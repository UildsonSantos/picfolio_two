import React, { useState } from 'react';
import api from '../axiosConfig';
import { saveToken } from '../authService';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const response = await api.post('/api/auth/login', { email, senha });
            saveToken(response.data.token); // Salvar token no localStorage
            navigate('/dashboard'); // Redirecionar para o dashboard
        } catch (err) {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={onClose}>Fechar</button> {/* Botão para fechar o Login */}
        </div>
    );
};

export default Login;
