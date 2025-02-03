import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import HomeContent from '../HomeContent/HomeContent';

import './styles.css'; // Importando o arquivo CSS

const Home = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showHome, setShowHome] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLogout = () => {
        logout();
        setShowHome(true); // Redireciona para a Home após o logout
    };

    const handleHomeClick = () => {
        setShowHome(true);
    };

    const handleDashboardClick = () => {
        setShowHome(false);
    };


    return (
        <div>
            <nav className="navbar">
                <div>
                    <h1 className="navbar-brand">PicFólio</h1>
                    <button className={showHome ? "active" : ""} onClick={handleHomeClick}>
                        Home
                    </button>
                    {user && ( // Exibe o botão Dashboard apenas se o usuário estiver logado
                        <button className={!showHome ? "active" : ""} onClick={handleDashboardClick}>
                            Dashboard
                        </button>
                    )}
                </div>
                {user ? ( // Verifica se o usuário está logado
                    <div>
                        <span>Bem-vindo(a), {user.nome}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                ) : (
                    <div>
                        <span>Bem-vindo(a), Visitante</span>
                        <button onClick={handleLoginClick}>Login</button>
                    </div>
                )}
            </nav>
            {showLogin && !user && <Login onClose={handleCloseLogin} onLoginSuccess={() => {
                setShowHome(false);
            }} />}
            {showHome ? (
                <>
                    {user ? (
                        <h2>Bem-vindo(a), {user.nome} ao seu PicFólio</h2>
                    ) : (
                        <h2>Bem-vindo(a) Visitante ao PicFólio</h2>
                    )}

                    <HomeContent />
                </>
            ) : (
                <Dashboard />
            )}
        </div>
    );
};

export default Home;
