import { TableBody, TableHead, TableHeadItem, TableS, Td, Tr } from "./styles";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import axios from "axios";

// Definição do tipo Consulta
interface Consulta {
  id: string;
  patient: {
    name: string;
    idade: string;      // Adicionando idade
    cid_card: string;   // Renomeando para corresponder à resposta da API
    sangue: string;
    endereco: string; // Adicionando logradouro se necessário
    numero: string;
  };
  data: string;
  horario: string;
  resumo?: string; 
  status?: string;
}

const Table: React.FC = () => {
  // Variáveis de estado
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidCard, setCidCard] = useState("");
  const [sangue, setSangue] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [resumo, setResumo] = useState(""); // Estado para o resumo
  const [modalVisible, setModalVisible] = useState(false);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar as consultas
  const fetchConsultas = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!id || !token) {
        setError('ID ou token não encontrado');
        return;
      }

      // http://localhost:3000/backend/consultas/1/historico

      const response = await axios.get(`http://34.55.145.113:3000/backend/consultas/${id}/historico`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setConsultas(response.data.dados);

      console.log(response.data)
    } catch (err: any) {
      setError(`Nenhuma consulta localizada`);
    } finally {
      setLoading(false);
    }
  };

  // Efeito para carregar as consultas ao montar o componente
  useEffect(() => {
    fetchConsultas();
  }, []);

  // Função para formatar a data
  const formatDateToPtBr = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  };

  const updateResumo = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('Token não encontrado');
        return;
      }

      await axios.put(`http://34.55.145.113:3000/backend/consulta/${id}/resumo`, { resumo }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert("Resumo atualizado com sucesso!");
      
      // Atualizando as consultas novamente após a alteração
      fetchConsultas(); // Isso vai buscar a lista atualizada

      setModalVisible(false);
    } catch (err: any) {
      setError(`Erro ao atualizar resumo: ${err.message}`);
    }
  };

  // Se está carregando, exibe a mensagem
  if (loading) return <p>Carregando...</p>;

  // Se houve erro, exibe a mensagem de erro
  if (error) return (
    <div
      style={{
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        color: '#721c24',
        padding: '15px',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '20px',
        fontWeight: 'bold',
        marginInline: 'auto',
      }}
    >
      <p>{error}</p>
    </div>
  );

  return (
    <>
      <TableS>
        <TableHead>
          <TableHeadItem>Nome</TableHeadItem>
          <TableHeadItem>Data</TableHeadItem>
          <TableHeadItem>Horário</TableHeadItem>
          <TableHeadItem>Resumo</TableHeadItem>
          <TableHeadItem>Status</TableHeadItem>
        </TableHead>
        <TableBody>
          {consultas.map((item) => (
            <Tr
              key={item.id}
              onClick={() => {
                setModalVisible(true);
                setNome(item.patient.name);
                setIdade("21 anos"); 
                setCidCard(item.patient.cid_card);
                setSangue("A+"); 
                setEndereco(item.patient.endereco); 
                setNumero("0"); 
                setResumo(item.resumo || ""); 
              }}
            >
              <Td>{item.patient.name}</Td>
              <Td>{formatDateToPtBr(item.data)}</Td>
              <Td>{item.horario}</Td>
              <Td>{item.resumo}</Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
        </TableBody>
      </TableS>

      {modalVisible && (
        <Modal
          onClick={() => {
            setModalVisible(false);
            fetchConsultas(); // Recarrega as consultas quando o modal é fechado
          }}
          nome={nome}
          idade={idade}
          cidCard={cidCard}
          sangue={sangue}
          endereco={endereco}
          numero={numero}
          resumo={resumo}
          onResumoChange={(newResumo) => setResumo(newResumo)}
          onUpdateResumo={() => {
            const consultaId = consultas.find(c => c.patient.name === nome)?.id;
            if (consultaId) updateResumo(consultaId);
          }}
        />
      )}
    </>
  );
};

export default Table;
