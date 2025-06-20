import styled from 'styled-components';
import clapLogoSrc from '/src/logo/clap.png';

export default function Cabecalho() {
  return (
    <Topo>
      <LogoImage src={clapLogoSrc} alt="Logo Cineflex" />
      <h1>Cineflex</h1>
    </Topo>
  );
}

const Topo = styled.div`
  background-color: #EE897F;
  color: #FADBC5;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0; 
  width: 100%;
  max-width: 400px; 
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 34px;
  line-height: normal;
  text-align: center;
  z-index: 100;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 9px;
`;