import styled from "styled-components";

export const Background = styled.div`
  background: linear-gradient(
    to bottom right,
    #0b4a50,
    #44a1a0
  ); /* Gradiente diagonal */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.form`
  width: 550px;
  height: auto;
  border-radius: 1.25rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 3rem 0;
`;

export const Submit = styled.input`
  cursor: pointer;
  background-color: #0b4a50;
  padding: 1rem;
  width: 320px;
  border-radius: 1rem;
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 1.5rem;
  color: #fff;
  transition: 0.3s;

  &:hover {
    background-color: transparent;
    border: 1px solid #0b4a50;
    color: #0b4a50;
  }
`;

export const Forgot = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
`;

export const Register = styled.button`
  border: none;
  background-color: transparent;
  text-decoration: underline;
  cursor: pointer;
`;

export const ButtosContaner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
