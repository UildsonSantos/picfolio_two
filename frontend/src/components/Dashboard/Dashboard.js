import React, { useState, useContext } from "react";
import axios from "axios";
import { getToken } from '../../authService';
import { AuthContext } from "../../context/AuthContext";

import './styles.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca
  const [images, setImages] = useState([]); // Estado para os resultados de busca
  const [loading, setLoading] = useState(false); // Estado para o carregamento
  const [imageTitle, setImageTitle] = useState(""); // Estado para título da imagem
  const [imageUrl, setImageUrl] = useState(""); // Estado para URL da imagem
  const [imageDescription, setImageDescription] = useState(""); // Estado para descrição
  const [insertLoading, setInsertLoading] = useState(false); // Estado para carregamento de inserção


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

      setImages(data);
    } catch (err) {
      console.error("Erro ao buscar imagens:", err.response?.data?.message || err.message);
      setImages([]); // Limpar as imagens em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // Função de inserção
  const handleInsert = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim() || !imageDescription.trim()) return;

    setInsertLoading(true);
    try {
      const token = getToken();
      const { data } = await axios.post(
        `http://localhost:5000/api/images`,
        { url: imageUrl, description: imageDescription, title: imageTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message || "Imagem inserida com sucesso!");
      setImageUrl("");
      setImageDescription("");
    } catch (err) {
      console.error("Erro ao inserir imagem:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Erro ao inserir imagem.");
    } finally {
      setInsertLoading(false);
    }
  };

  return (

    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <p>Bem-vindo, {user ? user.nome : "Visitante"}!</p>

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

      {/* Formulário de inserção */}
      <form onSubmit={handleInsert} className="form-container">
        <h2 className="form-title">Inserir nova imagem</h2>
        <input
          type="text"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)} // Atualizar o estado do título
          placeholder="Título da imagem"
          className="form-input"
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL da imagem"
          className="form-input"
        />
        <textarea
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
          placeholder="Descrição da imagem"
          className="form-textarea"
        ></textarea>
        <button
          type="submit"
          className="form-button"
        >
          {insertLoading ? "Inserindo..." : "Inserir"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
