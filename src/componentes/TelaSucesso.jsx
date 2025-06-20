import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function TelaSucesso() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  if (!state) {
    return (
      <SucessoContainer>
        <SecaoTitulo>
          <h1>Erro: Nenhum pedido encontrado!</h1>
        </SecaoTitulo>
        <BotaoVoltar onClick={() => navigate("/")}>
          Voltar para tela inicial
        </BotaoVoltar>
      </SucessoContainer>
    );
  }

  const {movieTitle, showtimeName, showtimeDate, selectedSeatNames, nomeComprador, cpfComprador} = state;

  return (
    <SucessoContainer>
      <SecaoTitulo>
        <h1>Pedido finalizado!</h1>
      </SecaoTitulo>

      <CaixaGeral>
        <BlocoInfo data-test="movie-info">
          <TituloInfo>Filme e sessão</TituloInfo>
          <Linha></Linha>
          <TextoInfo>{movieTitle}</TextoInfo>
          <TextoInfo>
            {showtimeDate} às {showtimeName}
          </TextoInfo>
        </BlocoInfo>

        <BlocoInfo data-test="seats-info">
          <TituloInfo>Ingressos</TituloInfo>
          <Linha></Linha>
          {selectedSeatNames.map((seatName) => (
            <TextoInfo key={seatName}>Assento {seatName}</TextoInfo>
          ))}
        </BlocoInfo>

        <BlocoInfo data-test="client-info">
          <TituloInfo>Comprador(a)</TituloInfo>
          <Linha></Linha>
          <TextoInfo>Nome: {nomeComprador}</TextoInfo>
          <TextoInfo>CPF: {cpfComprador}</TextoInfo>
        </BlocoInfo>
      </CaixaGeral>

      <BotaoVoltar onClick={() => navigate("/")} data-test="go-home-button">
        Voltar para tela inicial
      </BotaoVoltar>
    </SucessoContainer>
  );
}

const SucessoContainer = styled.div`
  padding: 67px 24px 117px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
`;

const Linha = styled.div`
  width: 302px;
  left: 38px;
  angle: -0 deg;
  border-width: 1px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #4E5A65;
`;

const SecaoTitulo = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Sarala", sans-serif;
  font-weight: 400;
  font-size: 24px;
  text-align: center;

  h1 {
    color: inherit;
  }
`;

const CaixaGeral = styled.div`
  width: 100%;
  background-color: #2B2D36;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px;
`;

const BlocoInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TituloInfo = styled.h2`
  font-size: 18px;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
  color: #EE897F;
  margin-bottom: 5px;
`;

const TextoInfo = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  margin-bottom: 10px;
`;

const BotaoVoltar = styled.button`
  width: 338px;
  height: 42px;
  border-radius: 8px;
  background-color: #ee897f;
  font-family: "Sarala", sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
  color: #2b2d36;
  border: none;
  cursor: pointer;
`;
