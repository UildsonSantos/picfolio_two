import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

import './styles.css'; // Importando o arquivo CSS

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLogout = () => {
        logout();
    };


    return (
        <div>
            <nav className="navbar">
                <h1>PicFólio</h1>
                {user ? ( // Verifica se o usuário está logado
                    <>
                        <span>Bem-vindo, {user.nome}!</span> {/* Exibe o nome do usuário */}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                    <span>Bem-vindo, Visitante!</span>
                    <button onClick={handleLoginClick}>Login</button>
                    </>
                )}
            </nav>
            {showLogin && <Login onClose={handleCloseLogin} />}
            {user ? ( // Exibe o Dashboard se o usuário estiver logado
                <Dashboard />
            ) : (
                <div>
                    <h2>Bem-vindo Visitante à página inicial!</h2>
                    <p>Conteúdo da página inicial aqui.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
