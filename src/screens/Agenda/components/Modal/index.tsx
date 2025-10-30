import { TextDiv } from "@/screens/Prontuario/components/Modal/styles";
import {
  BottomDiv,
  Container,
  Content,
  InfosDiv,
  Label,
  ModalS,
  Submit,
  TextArea,
  Title,
} from "./styles";

interface ModalProps {
  nome: string;
  idade: string;
  cidCard: string;
  sangue: string;
  endereco: string;
  numero: string;
  resumo: string; // Adicionando a prop para o resumo
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onResumoChange: (newResumo: string) => void; // Função para atualizar o resumo
  onUpdateResumo: () => void; // Função para atualizar o resumo na API
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  return (
    <ModalS>
      <Content>
        <Title>Prontuário</Title>
        <Container>
          <InfosDiv>
            <Label>Paciente:</Label>
            <p>{props.nome}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Idade:</Label>
            <p>{props.idade}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>CID-Card:</Label>
            <p>{props.cidCard}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Tipo Sanguíneo:</Label>
            <p>{props.sangue}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Endereço:</Label>
            <p>{props.endereco}</p>
          </InfosDiv>
          <InfosDiv>
            <Label>Número:</Label>
            <p>{props.numero}</p>
          </InfosDiv>
        </Container>
        <TextDiv>
          <Label>Resumo da consulta:</Label>
          <TextArea 
            value={props.resumo} // O valor do resumo
            onChange={(e) => props.onResumoChange(e.target.value)} // Atualiza o resumo
            placeholder="Digite o resumo da consulta aqui..."
          />
        </TextDiv>
        <BottomDiv>
          {/* <input type="file" name="" id="" /> */}
          <Submit onClick={props.onClick}>Fechar</Submit>
          <Submit onClick={props.onUpdateResumo}>Enviar</Submit> {/* Chama a função para atualizar o resumo */}
        </BottomDiv>
      </Content>
    </ModalS>
  );
};

export default Modal;
