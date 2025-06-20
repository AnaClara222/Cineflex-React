import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function TelaAssentos() {
  const { idSessao } = useParams();
  const navigate = useNavigate();
  const [sessao, setSessao] = useState(null);
  const [selecionados, setSelecionados] = useState([]);
  const [nomeComprador, setNomeComprador] = useState("");
  const [cpfComprador, setCpfComprador] = useState("");

  useEffect(() => {
    if (idSessao) {
      axios
        .get(
          `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        )
        .then((response) => {
          setSessao(response.data);
        })
        .catch((error) => {
          alert(
            "Erro ao carregar os assentos. Por favor, tente novamente mais tarde."
          );
        });
    }
  }, [idSessao]);

  const alternarSelecao = (assento) => {
    if (!assento.isAvailable) {
      alert("Esse assento não está disponível");
      return;
    }

    setSelecionados((prevSelecionados) => {
      const jaSelecionado = prevSelecionados.some((a) => a.id === assento.id);
      return jaSelecionado
        ? prevSelecionados.filter((a) => a.id !== assento.id)
        : [...prevSelecionados, assento];
    });
  };

  const handleReservarAssentos = () => {
    if (selecionados.length === 0) {
      alert("Selecione pelo menos um assento para reservar.");
      return;
    }
    if (nomeComprador.trim() === "" || cpfComprador.trim() === "") {
      alert("Por favor, preencha seu nome e CPF.");
      return;
    }

    const idsAssentos = selecionados.map((assento) => assento.id);

    const pedido = {
      ids: idsAssentos,
      name: nomeComprador,
      cpf: cpfComprador,
    };

    axios
      .post(
        "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
        pedido
      )
      .then((response) => {
        navigate("/sucesso", {
          state: {
            idsAssentos: idsAssentos,
            nomeComprador: nomeComprador,
            cpfComprador: cpfComprador,
            movieTitle: sessao.movie.title,
            showtimeName: sessao.name,
            showtimeDate: sessao.day.date,
            selectedSeatNames: selecionados.map((s) => s.name),
          },
        });
        setSelecionados([]);
        setNomeComprador("");
        setCpfComprador("");
      })
      .catch((error) => {
        alert("Erro ao reservar os assentos. Tente novamente.");
      });
  };

  if (!sessao) {
    return (
      <AssentosPageContainer>
        <TitleSection>
          <h1>Carregando assentos...</h1>
        </TitleSection>
      </AssentosPageContainer>
    );
  }

  return (
    <AssentosPageContainer>
      <TitleSection>
        <h1>Selecione o(s) assento(s)</h1>
      </TitleSection>
      <AssentosGrid>
        {sessao.seats.map((assento) => (
          <Assento
            key={assento.id}
            $disponivel={assento.isAvailable}
            $selecionado={selecionados.some((a) => a.id === assento.id)}
            onClick={() => alternarSelecao(assento)}
            data-test="seat"
          >
            {assento.name}
          </Assento>
        ))}
      </AssentosGrid>
      <Line></Line>

      <FormularioComprador>
        <label htmlFor="nome">Nome do comprador(a)</label>
        <input
          type="text"
          id="nome"
          placeholder="Digite seu nome..."
          value={nomeComprador}
          onChange={(e) => setNomeComprador(e.target.value)}
          data-test="client-name"
        />

        <label htmlFor="cpf">CPF do comprador(a)</label>
        <input
          type="text"
          id="cpf"
          placeholder="Digite seu CPF..."
          value={cpfComprador}
          onChange={(e) => setCpfComprador(e.target.value)}
          data-test="client-cpf"
        />
      </FormularioComprador>

      <BotaoReservarAssentos
        onClick={handleReservarAssentos}
        data-test="book-seat-btn"
      >
        Reservar assento(s)
      </BotaoReservarAssentos>
    </AssentosPageContainer>
  );
}

const AssentosPageContainer = styled.div`
  padding-top: 67px;
  padding-bottom: 117px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  background-color: #2b2d36;
`;

const TitleSection = styled.div`
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Sarala', sans-serif;
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
`;

const AssentosGrid = styled.div`
  width: 323px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 7px;
  margin: 0px 24px 16px 24px;
`;

const Assento = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 12px;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
  font-size: 11px;
  font-weight: 400;
  cursor: pointer;

  ${({ $selecionado, $disponivel }) => {
    if ($selecionado) {
      return `
        background-color: #FADBC5;
        border: 2px solid #EE897F;
        color: #000000;
      `;
    }
    if ($disponivel) {
      return `
        background-color: #9DB899;
        border: 1px solid #808F9D;
        color: #000000;
      `;
    }
    return `
      background-color: #2C3440;
      border: 1px solid #4E5A65;
      color: #2C3440; 
    `;
  }}
`;

const Line = styled.div`
  width: 302px;
  margin-top: 30px;
  border: 1px solid #4e5a65;
`;

const FormularioComprador = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  margin-top: 24px;
  margin-bottom: 28px;
  gap: 8px;

  label {
    font-family: 'Sarala', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    text-align: left;
  }

  input {
    width: 338px;
    height: 40px;
    margin-bottom: 10px;
    background-color: #FFFFFF;
    border: 1px solid #D4D4D4;
    border-radius: 8px;
    padding-left: 18px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: black;

`;

const BotaoReservarAssentos = styled.button`
  width: 338px;
  height: 42px;
  border-radius: 8px;
  background-color: #ee897f;
  color: #2B2D36;
  border: none;
  cursor: pointer;
  font-family: 'Sarala', sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
  vertical-align: middle;
`;
