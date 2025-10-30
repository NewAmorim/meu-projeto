import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './styles.css';

const Prontuario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!nome || !email || !mensagem) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://34.55.145.113:3000/backend/contato', {
        name: nome,
        email: email,
        message: mensagem,
      });

      if (response.data.erro) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: response.data.mensagem,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Mensagem enviada com sucesso!',
        });
        // Limpa os campos após o envio
        setNome('');
        setEmail('');
        setMensagem('');
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao enviar a mensagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="Main">
      <NavBar />
      <div className="inputs">
        {/* LADO ESQUERDO */}
        <div className="left-container">
          <h1 className="text1">
            Ouvir suas dúvidas, críticas ou sugestões é muito importante para nós. <br /> Utilize o formulário abaixo para enviar sua mensagem!
          </h1>
          {error && <div className="error">{error}</div>}
          {/* forms */}
          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="inpust_container">
              <label htmlFor="nome" id="nomeid">Nome:</label>
              <input
                required
                type="text"
                id="nomebar"
                placeholder="Por favor, colocar seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            {/* email */}
            <div className="inpust_container">
              <label htmlFor="email" id="emailid">E-mail:</label>
              <input
                required
                type="email"
                id="emailbar"
                placeholder="Por favor, colocar seu e-mail completo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* text-area */}
            <div className="inpust_container">
              <label htmlFor="mensagem" id="mensagemid">Conte para nós sua dúvida:</label>
              <textarea
                id="mensagembar"
                placeholder="Deixe sua mensagem"
                rows={5}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)} // Atualiza o estado
              />
            </div>
            {/* button */}
            <div className="inpust_container">
              <button type="submit" className="btEnviar" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
        {/* LADO DIREITO */}
        <div className="container2">
          <div>
            <h2 className="titlecontainer2">Fale Conosco</h2><br />
            <div className="contact_container">
              <p className="descriptions_contact">Segunda à Sexta das 08h às 18h</p>
              <p className="descriptions_contact"><u>Telefone:</u> (11) 4239-3200</p>
              <p className="descriptions_contact"><u>E-mail:</u> suporte@sigma.com.br</p>
              <p className="descriptions_contact"><u>Endereço:</u> R. Espírito Santo, 277 - Santo Antônio, <br /> São Caetano do Sul - SP, 09530-905 </p>
              <p className="descriptions_contact">Veja no mapa:</p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.5902148622004!2d-46.57582742548516!3d-23.619025063711646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5ceb39423fb7%3A0x543148b172f303c8!2sR.%20Esp%C3%ADrito%20Santo%2C%20277%20-%20Santo%20Ant%C3%B4nio%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009530-700!5e0!3m2!1spt-BR!2sbr!4v1728429465171!5m2!1spt-BR!2sbr"
            width="500"
            height="300"
            style={{ border: 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};

export default Prontuario;
