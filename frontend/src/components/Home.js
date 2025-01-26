import React, { useState } from 'react';
import Login from './Login';

const Home = () => {
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <div>
            <nav>
                <h1>Minha Aplicação</h1>
                <button onClick={handleLoginClick}>Login</button>
            </nav>
            {showLogin && <Login onClose={handleCloseLogin} />}
            <h2>Bem-vindo à página inicial!</h2>
            <p>Conteúdo da página inicial aqui.</p>
        </div>
    );
};

export default Home;
