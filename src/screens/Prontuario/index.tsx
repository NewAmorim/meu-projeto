import NavBar from "@/components/NavBar";
import { Container } from "../Agenda/styles";
import Table from "./components/Table";

const Prontuario: React.FC = () => {
  return (
    <Container>
    <NavBar />
    <Table />
  </Container>
  );
};

export default Prontuario;
