import styled from "styled-components";

export const DivS = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem 3rem;
  border-radius: 1rem;
  border: 1px solid #0b4a50;
  font-size: 1.5rem;
  font-weight: 500;
  color: #0b4a50;

  &::placeholder {
    color: #0b4a50;
  }
`;

export const User = styled.img`
  position: absolute;
  top: 30%;
  left: 4%;
  width: 20px;
`;
export const Password = styled.img`
  position: absolute;
  top: 30%;
  left: 4%;
  width: 20px;
`;
export const Eye = styled.img`
  position: absolute;
  right: 5%;
  top: 30%;
  width: 30px;
`;
