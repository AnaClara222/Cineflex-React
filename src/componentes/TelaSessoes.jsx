import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function TelaSessoes() {
  const { idFilme } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
      )
      .then((response) => setMovieData(response.data))
      .catch((error) => {
        console.error("Erro ao buscar sessões:", error);
        alert("Erro ao carregar sessões. Tente novamente.");
      });
  }, [idFilme]);

  if (!movieData) {
    return (
      <div>
        <Sessoes>
          <h1>Carregando sessões...</h1>
        </Sessoes>
      </div>
    );
  }

  return (
    <div>
      <Sessoes>
        <h1>Selecione o horário</h1>
      </Sessoes>
      <ListaSessoes>
        {movieData.days.map((day) => (
          <DiaSessoes key={day.id} data-test="movie-day">
            <p>
              {day.weekday} - {day.date}
            </p>
            <Linha></Linha>
            <Horarios>
              {day.showtimes.map((showtime) => (
                <HorarioBotao
                  key={showtime.id}
                  to={`/assentos/${showtime.id}`}
                  data-test="showtime"
                >
                  {showtime.name}
                </HorarioBotao>
              ))}
            </Horarios>
          </DiaSessoes>
        ))}
      </ListaSessoes>
    </div>
  );
}

const Sessoes = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Sarala", sans-serif;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  margin-top: 65px;

  h1 {
    color: inherit;
  }
`;

const ListaSessoes = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  margin: 0 auto 30px auto;
`;

const DiaSessoes = styled.div`
  background-color: #2B2D36;
  border-radius: 8px;
  padding: 16px 24px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ffffff;

  p {
    font-family: "Sarala", sans-serif;
    font-weight: 400;
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 12px;
  }
`;

const Linha = styled.div`
  width: 302px;
  angle: -0 deg;
  border-width: 1px;
  margin-top: 10px;
  border: 1px solid #4E5A65
`;

const Horarios = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 25px;
  justify-content: center;
`;

const HorarioBotao = styled(Link)`
  background-color: transparent;
  color: #ee897f;
  border: 2px solid #ee897f;
  width: 83px;
  height: 41px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ee897f;
    color: white;
  }
`;
