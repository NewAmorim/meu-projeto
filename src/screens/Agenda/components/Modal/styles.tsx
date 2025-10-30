import styled from "styled-components";

export const ModalS = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0000005e;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 60%;
  height: max-content;
  background-color: #fff;
  border-radius: 1rem;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

export const Container = styled.div`
  margin-block: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 2rem;
`;

export const InfosDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Label = styled.p`
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 20rem;
  padding: 1rem;
  outline: none;
  margin-top: 1rem;
  border-radius: 0.7rem;
  resize: none;
`;

export const BottomDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Submit = styled.button`
  width: 150px;
  padding: 0.7rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  color: #fff;
  background-color: #0b4a50;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #000;
    border-color: #000;
  }
`;
