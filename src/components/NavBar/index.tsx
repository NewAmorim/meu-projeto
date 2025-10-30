import { useNavigate } from "react-router-dom";
import {
  ButtonTitle,
  DivS,
  MedicoDiv,
  MedicoImagem,
  MedicoName,
  Nav,
  NavButton,
} from "./styles";

import agenda from "@/assets/agenda.svg";
import dash from "@/assets/dash.svg";
import suporte from "@/assets/suporte.svg";
import logout from "@/assets/log-out.svg";
import historico from "@/assets/historico.svg";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  // Navigate
  const navigate = useNavigate();
  const [name, setName] = useState<null | string>(null);

  useEffect(() => {
    const fetchNameMedico = async () => {
      const fullName = await localStorage.getItem("name");
      const firstName = fullName ? fullName.split(" ")[0] : "";
      setName(firstName);
    };

    fetchNameMedico();
  }, []);

  // Rendering
  return (
    <DivS>
      <MedicoDiv>
        <MedicoImagem src="https://imgur.com/XgH8VgQ.png" alt="" />
        <MedicoName>Drª {name}</MedicoName>
      </MedicoDiv>
      <Nav>
        <NavButton
          onClick={() => {
            navigate("/agenda");
          }}
        >
          <img src={agenda} alt="" />
          <ButtonTitle>Agenda</ButtonTitle>
        </NavButton>
         <NavButton
          onClick={() => {
            navigate("/prontuario");
          }}
        >
          <img src={historico} alt="" />
          <ButtonTitle>Histórico</ButtonTitle>
        </NavButton> 
        <NavButton
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={dash} alt="" />
          <ButtonTitle>Dashboard</ButtonTitle>
        </NavButton>
        <NavButton
          onClick={() => {
            navigate("/suporte");
          }}
        >
          <img src={suporte} alt="" />
          <ButtonTitle>Suporte</ButtonTitle>
        </NavButton>
        <NavButton
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          <img style={{ width: 45 }} src={logout} alt="" />
          <ButtonTitle>Sair</ButtonTitle>
        </NavButton>
      </Nav>
    </DivS>
  );
};

export default NavBar;
