import NavBar from "@/components/NavBar";
import { Container } from "./styles";
import Table from "./components/Table";

const Agenda: React.FC = () => {
  return (
    <>
      <Container>
        <NavBar />
        <Table />
      </Container>
    </>
  );
};

export default Agenda;
