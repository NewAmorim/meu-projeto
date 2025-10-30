import InputS from "@/components/Input";
import {
  Background,
  ButtosContaner,
  Content,
  Forgot,
  Loading,
  Register,
  Submit,
} from "./styles";

import logo from "@/assets/VERDE.jpg";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Login: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  // Variables
  const [email, setEmail] = useState<string | null>(""); 
  const [password, setPassword] = useState<string | null>(""); 
  const [error, setError] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [_forgotPasswordSuccess, setForgotPasswordSuccess] = useState<boolean>(false);


  // Function for login
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o recarregamento da página
    setLoading(true);
    axios
      .post("http://34.55.145.113:3000/backend/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log('SUCESSO', res.data);
        localStorage.setItem("id", res.data.doctor.id);
        localStorage.setItem("name", res.data.doctor.name);
        localStorage.setItem("token", res.data.token);

        if (res && res.data) {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log('Erro:', err); // Print the full error object
        if (err.response) {
          console.log('Resposta do servidor:', err.response.data);
          console.log('Status do servidor:', err.response.status);
        } else if (err.request) {
          console.log('Erro na requisição:', err.request);
        } else {
          console.log('Erro ao configurar a requisição:', err.message);
        }
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function for forgot password
  const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Previne o comportamento de submit
    if (!email) {
      alert("Por favor, insira seu email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://34.55.145.113:3000/backend/redefinir-senha", {
        email: email,
      });
      console.log(response.data);
      alert("Instruções para redefinição de senha foram enviadas para o seu email.");
      setForgotPasswordSuccess(true);
    } catch (error) {
      console.error("Erro ao enviar a solicitação de redefinição de senha:", error);
      alert("Erro ao enviar a solicitação de redefinição de senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Rendering
  return (
    <Background>
      <Content onSubmit={handleSubmit}>
        <img style={{width: 275, marginTop: "-7%"}} src={logo} alt="" />
        <InputS
          password={false}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <InputS
          password
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p style={{ color: "red" }}>Senha ou usuário incorreto</p>}
        {loading ? (
          <Loading>
            <ClipLoader color={"#0b4a50"} loading={true} size={50} />
          </Loading>
        ) : (
          <Submit type="submit" value={`Acessar`} />
        )}

        <ButtosContaner>
          <Forgot onClick={handleForgotPassword}>Esqueci minha senha</Forgot>
          <Register
            onClick={() => {
              navigate("/register");
            }}
          >
            Registrar
          </Register>
        </ButtosContaner>
      </Content>
    </Background>
  );
};

export default Login;
