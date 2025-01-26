import React from 'react';
import { removeToken } from '../authService';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate(); // Hook para navegação

    const handleLogout = () => {
        removeToken(); // Remove o token do localStorage
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div>
            <h1>Bem-vindo ao Dashboard!</h1>
            <p>Encontre as melhores fotografias da sua vida!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
