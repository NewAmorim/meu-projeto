import InputS from "@/components/Input";
import { Background, Content, SelectS, Submit } from "./styles";
import logo from "@/assets/logo.svg";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Login/styles";
import ClipLoader from "react-spinners/ClipLoader";

const Register: React.FC = () => {
  // Navigation
  const navigate = useNavigate();

  // Variables
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [endereco, setEndereco] = useState<string | null>(null);
  const [especialidade, setEspecialidade] = useState<number>(0);
  const [crm, setCrm] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); // Changed to string for error messages
  const [loading, setLoading] = useState<boolean>(false);

  // Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the page from reloading
    setLoading(true);
    setError(null); // Reset error state before submitting

    axios
      .post("http://34.55.145.113:3000/backend/cadastrar", {
        name: name,
        email: email,
        password: password,
        crm: crm,
        endereco: endereco,
        especialidade: especialidade,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.request);
        setError("Erro ao cadastrar. Verifique suas informações e tente novamente.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Background>
      <Content onSubmit={handleSubmit}>
        <img src={logo} alt="" />
        <InputS
          placeholder="Nome"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <InputS
          placeholder="CRM"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCrm(e.target.value);
          }}
        />
        <InputS
          placeholder="Email"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <InputS
          placeholder="Endereço"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEndereco(e.target.value);
          }}
        />
        <InputS
          password
          placeholder="Senha"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />

        <SelectS
          value={especialidade || ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setEspecialidade(parseInt(e.target.value));
          }}
          required
        >
          <option value="" disabled selected>
            Selecione uma especialidade
          </option>
          <option value={1}>Especialidade 1</option>
          <option value={2}>Especialidade 2</option>
          <option value={3}>Especialidade 3</option>
        </SelectS>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

        {loading ? (
          <Loading>
            <ClipLoader color={"#0b4a50"} loading={true} size={30} />
          </Loading>
        ) : (
          <Submit type="submit" value={`Registrar`} />
        )}
      </Content>
    </Background>
  );
};

export default Register;
