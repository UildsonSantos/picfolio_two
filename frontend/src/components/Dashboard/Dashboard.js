import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import DOMPurify from 'dompurify';
import { getAccessToken } from '../../authService';
import { AuthContext } from "../../context/AuthContext";
import api from "../../axiosConfig";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [errorInsert, setErrorInsert] = useState('');
  const searchTermRef = useRef(searchTerm);  // Usar uma ref para armazenar o searchTerm atual
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSearch = useCallback(async (e) => {
    if (e) {
      e.preventDefault(); // Evitar reload da página
    }

    // Sanitizar o termo de busca
    const sanitizedSearchTerm = DOMPurify.sanitize(searchTermRef.current); // Usar a ref

    if (!sanitizedSearchTerm.trim()) { // Verificar se o campo está vazio 
      setError('Por favor, insira um termo de busca.'); // Define a mensagem de erro
      setLoading(false); // Esconde o indicador de carregamento
      setImages([]); // Limpa as imagens
      return; // Interrompe a pesquisa se o termo estiver vazio
    }

    setError(''); // Limpa qualquer mensagem de erro anterior
    setLoading(true);

    try {
      const token = getAccessToken(); // Obter o token do localStorage
      const { data } = await api.get(`https://localhost:5000/api/images`, {
        params: { title: sanitizedSearchTerm, page: currentPage, limit: 10 }, // Passar o termo de busca como parâmetro
        headers: {
          Authorization: `Bearer ${token}`, // Adicionar o token ao cabeçalho
        },
      });

      setTotalPages(data.totalPages);
      setImages(data.images);
    } catch (error) {
      if (error.response?.status === 403) {
        // Token inválido, desloga o usuário
        logout();
        window.location.href = '/';
      } else if (error.logout) {
        // Sessão expirada, redireciona para o login
        logout();
        window.location.href = '/';
      } else {
        // Outros erros
        console.error("Erro ao buscar imagens:", error.response?.data?.message || error.message);
        setImages([]); // Limpar as imagens em caso de erro
        setError("Erro ao buscar imagens. Tente novamente mais tarde."); // Define a mensagem de erro
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, logout]); // Dependências de handleSearch

  // Atualizar a ref sempre que searchTerm mudar
  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);



  useEffect(() => {
    if (searchTermRef.current.trim()) { // Usar a ref para verificar se há um termo de busca
      handleSearch(); // Chama a busca sempre que a página atual mudar
    }
  }, [currentPage, handleSearch]);

  // Função de inserção
  const handleInsert = async (e) => {
    if (e) {
      e.preventDefault(); // Evitar reload da página
    }
    setErrorInsert(''); // Limpa o erro *antes* da inserção
    // Sanitizar as entradas
    const sanitizedTitle = DOMPurify.sanitize(imageTitle);
    const sanitizedUrl = DOMPurify.sanitize(imageUrl);
    const sanitizedDescription = DOMPurify.sanitize(imageDescription);

    if (!sanitizedUrl.trim() || !sanitizedDescription.trim() || !sanitizedTitle.trim()) {
      setErrorInsert("Por favor, preencha todos os campos.");
      return;
    }

    setInsertLoading(true);
    try {
      const token = getAccessToken();
      const { data } = await api.post(
        `https://localhost:5000/api/images`,
        { url: sanitizedUrl, description: sanitizedDescription, title: sanitizedTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message || "Imagem inserida com sucesso!");

      setImageUrl("");
      setImageDescription("");
      setImageTitle("");
    } catch (error) {
      if (error.response?.status === 403) {
        // Token inválido, desloga o usuário
        logout();
        window.location.href = '/';
      } else if (error.logout) {
        // Sessão expirada, redireciona para o login
        logout();
        window.location.href = '/';
      } else {
        console.error("Erro ao inserir imagem:", error.response?.data?.message || error.message);
        setErrorInsert(error.response?.data?.message || "Erro ao inserir imagem. Verifique todos os dados e use uma URL válida");
      }
    } finally {
      setInsertLoading(false);
    }
  };

  // Limpa os erros no carregamento inicial (ou em cada renderização se necessário)
  useEffect(() => {
    setError('');
    setErrorInsert('');
  }, []); // Array de dependências vazio para executar apenas uma vez na montagem


  return (
    <div className="dashboard">
      <h1 className="title">Dashboard</h1>
      <p>Bem-vindo(a), {user ? user.nome : "Visitante"}!</p>

      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          id="search"
          name="search"
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
      {error && <p className="error-message">{error}</p>}

      {/* Mostra imagem selecionada */}
      {selectedImage && (
        <div className="modal-image" onClick={closeModal}>
          <div className="modal-image-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
            />
            <p className="modal-image-description">{selectedImage.description}</p>
            <button className="modal-image-close-button" onClick={closeModal}>
              X
            </button>
          </div>
        </div>
      )}

      {/* Resultados da busca */}
      <div className="image-grid">
        {loading ? (
          <p>Carregando imagens...</p> // Mensagem de carregamento
        ) : images.length > 0 ? (
          images.map((img, index) => (
            <div key={index} className="image-card" onClick={() => handleImageClick(img)}>
              <img src={img.url} alt={img.description} className="image" />
              <p className="image-title">{img.description}</p>
            </div>
          ))
        ) : (
          <p>Busque suas imagens..</p> // Mensagem quando não há imagens
        )}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Anterior
        </button>
        <span> Página {currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>

      {/* Formulário de inserção */}
      <form onSubmit={handleInsert} className="form-container">
        <h2 className="form-title">Inserir nova imagem</h2>
        <input
          type="text"
          id="imageTitle"
          name="imageTitle"
          value={imageTitle}
          onChange={(e) => setImageTitle(e.target.value)} // Atualizar o estado do título
          placeholder="Título da imagem"
          className="form-input"
        />
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="URL da imagem"
          className="form-input"
        />
        <textarea
          id="imageDescription"
          name="imageDescription"
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

      {errorInsert && <p className="error-message">{errorInsert}</p>}
    </div>
  );
};

export default Dashboard;
