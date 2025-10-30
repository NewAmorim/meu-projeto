import styled from "styled-components";

export const DivS = styled.div`
  width: 25%;
  height: 100vh;
  background: linear-gradient(to bottom right, #0b4a50, #44a1a0);

  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const MedicoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #145da0;
`;

export const MedicoImagem = styled.img`
width: 150px;
`;

export const MedicoName = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  padding-bottom: 2rem;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 2rem;
`;

export const NavButton = styled.button`
  display: flex;
  border: none;
  background-color: transparent;
  cursor: pointer;
  gap: 2rem;
  width: 70%;
`;

export const ButtonTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  padding-bottom: 2rem;
  text-align: left;
`;
