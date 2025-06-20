import { Routes, Route } from 'react-router-dom';
import Cabecalho from './componentes/Cabecalho';
import FilmesCartaz from './componentes/FilmesCartaz';
import TelaSessoes from './componentes/TelaSessoes';
import TelaAssentos from './componentes/TelaAssentos';
import TelaSucesso from './componentes/TelaSucesso';

export default function App() {
  return (
    <>
      <Cabecalho />
      <Routes>
        <Route path="/" element={<FilmesCartaz />} />
        <Route path="/sessoes/:idFilme" element={<TelaSessoes />} />
        <Route path="/assentos/:idSessao" element={<TelaAssentos />} />
        <Route path="/sucesso" element={<TelaSucesso />} />
      </Routes>
    </>
  );
}