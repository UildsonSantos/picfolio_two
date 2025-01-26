import React, { useState } from "react";
import axios from "axios";
import { getToken } from '../authService';


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [images, setImages] = useState([]); // Estado para os resultados de busca
  const [loading, setLoading] = useState(false); // Estado para o carregamento

  const handleSearch = async (e) => {
    e.preventDefault(); // Evitar reload da página
    if (!searchTerm.trim()) return; // Verificar se o campo está vazio

    setLoading(true);
    try {
      const token = getToken(); // Obter o token do localStorage
      const { data } = await axios.get(`http://localhost:5000/api/images`, {
        params: { title: searchTerm }, // Passar o termo de busca como parâmetro
        headers: {
          Authorization: `Bearer ${token}`, // Adicionar o token ao cabeçalho
        },
      });

      setImages(data); // Atualizar as imagens com os resultados
    } catch (err) {
      console.error("Erro ao buscar imagens:", err.response?.data?.message || err.message);
      setImages([]); // Limpar as imagens em caso de erro
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar imagens..."
          className="search-input"
        />
        <button
          type="submit"
          className="search-button"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Resultados da busca */}
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="image-card">
              <img src={img.url} alt={img.description} className="image" />
              <p className="image-description">{img.description}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma imagem encontrada.</p> // Mensagem quando não há imagens
        )}
      </div>
    </div>
  );
};

export default Dashboard;
