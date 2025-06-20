import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function FilmesCartaz() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies')
      .then(response => setMovies(response.data))
      .catch(error => {
        console.error("Erro ao buscar filmes:", error);
        alert("Erro ao carregar os filmes. Por favor, tente novamente mais tarde.");
      });
  }, []);

  return (
    <FilmesContainer>
      <Filmes>
        <h1>Em Cartaz</h1>
      </Filmes>
      <ListaFilmes>
        {movies.map(movie => (
          <FilmeWrapper key={movie.id} data-test="movie">
            <Link to={`/sessoes/${movie.id}`}>
              <FilmeImagem src={movie.posterURL} alt={movie.title} />
            </Link>
          </FilmeWrapper>
        ))}
      </ListaFilmes>
    </FilmesContainer>
  );
}

const FilmesContainer = styled.div`
  padding-top: 65px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 375px;
  margin: 0 auto;
`;

const Filmes = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Sarala', sans-serif;
  font-weight: 300;
  font-size: 24px;
  text-align: center;

  h1 {
    color: inherit;
  }
`;

const ListaFilmes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px 27px;
  padding: 0 16px;
  width: 100%;
`;

const FilmeWrapper = styled.div`
  width: 145px;
  height: 210px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  &:hover {
    transform: scale(1.05);
  }
`;

const FilmeImagem = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  object-fit: cover;
`;
