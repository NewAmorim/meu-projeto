import styled from "styled-components";

export const TableS = styled.table`
  width: 70%;
  margin: 2% auto 0 auto;
  height: max-content;
  border-spacing: 0;
`;

export const TableHead = styled.thead`
  background-color: #0b4b50;
  height: 3rem;
`;

export const TableHeadItem = styled.th`
  color: #fff;
  font-size: 1.5rem;

  &:first-child {
    border-top-left-radius: 1rem;
  }
  &:last-child {
    border-top-right-radius: 1rem;
  }
`;

export const TableBody = styled.tbody``;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #cfd9e2; /* Define a cor para linhas pares */
  }

  &:nth-child(odd) {
    background-color: #e7ebef; /* Define a cor para linhas ímpares */
  }

  height: 50px;
  cursor: pointer;
`;

export const Td = styled.td`
  text-align: center;
  font-weight: bold;
`;
