const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const moment = require("moment");



const { eAdmin } = require("./middlewares/auth");

const Doctor = require("./models/user");
const Specialty = require("./models/specialty");
const Patient = require("./models/patient");
const Enquiry = require("./models/enquiry");
const Contact = require("./models/contact")
const MonthlyConsultation = require('./models/monthly_consultations');
const AttendanceType = require('./models/attendance_types');
const SpecialtyRanking = require('./models/specialty_rankings');
const AttendanceStatus = require('./models/attendance_status');


// USE LOCAL HOST
const cors = require("cors");
const { Op } = require("sequelize");

app.use(express.json());
app.use(cors());

app.get("/backend", async (req, res) => {
  await Doctor.findAll({
    attributes: ["id", "name", "crm"],
    order: [["id", "DESC"]],
  })
    .then((doctors) => {
      return res.json({
        erro: false,
        mensagem: {
          doctors,
          servidor: `Servidor rodando em: http://${req.hostname}:${process.env.PORT || 8072}/backend`
        },
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Nenhum usuário encontrado!!",
      });
    });
});
// CADASTRO DE USUARIO
app.post("/backend/cadastrar", async (req, res) => {

  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);

  try {
    await Doctor.create(dados);
    return res.json({
      erro: false,
      mensagem: "Usuário cadastrado com sucesso!!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error ao cadastrar o usuário!!" + error,
    });
  }
});
// LOGIN DE MEDICO
app.post("/backend/login", async (req, res) => {
  const doctor = await Doctor.findOne({
    attributes: ["id", "name", "email", "password"],
    where: {
      email: req.body.email,
    },
  });
  if (doctor === null) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, doctor.password))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  var token = jwt.sign(
    { id: doctor.id },
    "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9",
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!!",
    token,
    doctor,
  });
});
// GET ALL DOCTORS
app.get("/backend/medicos", async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Specialty,
          as: 'specialty',
          attributes: ['name']
        }
      ]
    });

    return res.json({
      erro: false,
      mensagem: doctors.map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        crm: doctor.crm,
        endereco: doctor.endereco,
        especialidade: doctor.specialty ? doctor.specialty.name : null
      })),
      id_usuario_logado: req.userId,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      erro: true,
      mensagem: "Nenhum usuário encontrado!!",
    });
  }
});
// CADASTRO DE PACIENTE
app.post("/backend/cadastrar/paciente", async (req, res) => {
  console.log(req.body);

  const { email, cpf, cid_card } = req.body;

  // Check if email, CPF, or CID card already exist
  const existingPatient = await Patient.findOne({
    where: {
      [Op.or]: [
        { email },
        { cpf },
        { cid_card },
      ],
    },
  });

  if (existingPatient) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error: Este e-mail, CPF ou CID card já está cadastrado!",
    });
  }

  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);

  try {
    await Patient.create(dados);
    return res.json({
      erro: false,
      mensagem: "Paciente cadastrado com sucesso!!",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Error ao cadastrar o usuário: " + error.message,
    });
  }
});

app.get("/backend/especialidades", async (req, res) => {
  await Specialty.findAll({
    attributes: ["id", "name"],
    order: [["id", "ASC"]],
  })
    .then((specialties) => {
      return res.json({
        erro: false,
        mensagem: {
          specialties,
        },
        id_usuario_logado: req.userId,
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Nenhum usuário encontrado!!",
      });
    });
});

// LOGIN PACIENTE
app.post("/backend/login/paciente", async (req, res) => {
  const patient = await Patient.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (patient === null) {
    return res.status(400).json({
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  if (!(await bcrypt.compare(req.body.password, patient.password))) {
    return res.status(400).json({
      mensagem: "Error: Usuário ou senha Incorreta!",
    });
  }

  var token = jwt.sign(
    { id: patient.id },
    "4F8U4O6JH18O74DG3A1FH8J7DV21MN1D4FD69Y97QW1ASD4F6GJ8HU9",
    {
      expiresIn: "7d",
    }
  );

  return res.json({
    mensagem: "Login realizado com sucesso!!",
    token,
    patient,
    statusCode: 200
  });
});

app.post("/backend/consulta", eAdmin, async (req, res) => {
  const dados = req.body;

  try {
    const dataFormatada = moment(dados.data, ["DD/MM/YYYY", "YYYY-MM-DD"], true);

    if (!dataFormatada.isValid()) {
      return res.status(400).json({
        erro: true,
        mensagem: "Data inválida. Utilize o formato DD/MM/YYYY ou YYYY-MM-DD.",
      });
    }

    dados.data = dataFormatada.format("YYYY-MM-DD");

    const medico = await Doctor.findOne({ where: { especialidade: dados.modalidade } });

    if (!medico) {
      return res.status(404).json({
        erro: true,
        mensagem: "Médico com a especialidade especificada não encontrado.",
      });
    }

    dados.medico = medico.id;

    const dataHoraCompleta = moment(`${dados.data}`, "YYYY-MM-DD").format("YYYY-MM-DD");

    const consultaExistente = await Enquiry.findOne({
      where: {
        medico: dados.medico, 
        data: dataFormatada,
        horario: dados.horario, 
      }
    });

    if (consultaExistente) {
      return res.status(400).json({
        erro: true,
        mensagem: "Já existe uma consulta agendada para esse médico, no mesmo dia e horário.",
      });
    }

    // Criar a nova consulta
    await Enquiry.create(dados);

    const attendanceType = await AttendanceType.findOne({
      where: { type: 'Consultas' },
    });

    if (attendanceType) {
      attendanceType.count += 1;
      await attendanceType.save();
    } else {
      // Se não encontrar o tipo "Consultas", cria um novo registro com count = 1
      await AttendanceType.create({
        type: 'Consultas',
        count: 1,
      });
    }

    return res.json({
      erro: false,
      mensagem: "Consulta cadastrada com sucesso!",
    });

  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao fazer consulta: " + error.message,
    });
  }
});

app.get("/backend/consultas/:id", eAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const consultas = await Enquiry.findAll({
      where: {
        medico: id,
        // data: {
        //   [Op.gte]: new Date(),
        // },
        status: 'pendente'
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: [] }, 
        },
        {
          model: Doctor,
          attributes: ['id', 'name', 'especialidade'],
        },
      ],
    });

    if (consultas.length === 0) {
      return res.status(404).json({
        erro: true,
        mensagem: "Nenhuma consulta encontrada para o médico fornecido",
      });
    }

    return res.json({
      erro: false,
      dados: consultas,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao buscar consultas: " + error.message,
    });
  }
});


app.get("/backend/consultas/:id/historico", eAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const consultas = await Enquiry.findAll({
      where: {
        medico: id,
        status: 'finalizada'
      },
      include: [
        {
          model: Patient,
          attributes: { exclude: [] }, 
        },
        {
          model: Doctor,
          attributes: ['id', 'name', 'especialidade'],
        },
      ],
    });

    if (consultas.length === 0) {
      return res.status(404).json({
        erro: true,
        mensagem: "Nenhuma consulta encontrada para o médico fornecido",
      });
    }

    return res.json({
      erro: false,
      dados: consultas,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao buscar consultas: " + error.message,
    });
  }
});

app.post("/backend/contato", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      erro: true,
      mensagem: "Todos os campos (nome, email, mensagem) são obrigatórios!",
    });
  }

  try {
    await Contact.create({ name, email, message });


    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ffafef615d8ee5",
        pass: "99b1928c36d028"
      }
    });
  
    const mailOptions = {
      from: "no-reply@sigma.com.br",
      to: email,
      subject: "Contato de Suporte",
      text: `
        Olá,
    
        Recebemos sua solicitação de suporte. Em breve iremos entrar em contato. 
    
        Agradecemos por utilizar nossos serviços!
    
        Atenciosamente,
        Equipe SIGMA
      `,
    };
  
  
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          erro: true,
          mensagem: "Erro ao enviar email: " + error.message,
        });
      }
      return res.json({
        erro: false,
        mensagem: "Nova senha enviada para seu email!",
      });
    });

    return res.json({
      erro: false,
      mensagem: "Contato enviado com sucesso!",
    });


    
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao enviar contato: " + error.message,
    });
  }
});

const gerarSenhaAleatoria = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

app.post("/backend/redefinir-senha", async (req, res) => {
  const { email } = req.body;

  const user = await Doctor.findOne({ where: { email } });
  const patient = await Patient.findOne({ where: { email } });

  if (!user && !patient) {
    return res.status(400).json({
      erro: true,
      mensagem: "Email não encontrado!",
    });
  }

  const novaSenha = gerarSenhaAleatoria();
  const senhaCriptografada = await bcrypt.hash(novaSenha, 8);

  if (user) {
    await Doctor.update({ password: senhaCriptografada }, { where: { email } });
  } else if (patient) {
    await Patient.update({ password: senhaCriptografada }, { where: { email } });
  }

  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ffafef615d8ee5",
      pass: "99b1928c36d028"
    }
  });

  const mailOptions = {
    from: "no-reply@sigma.com.br",
    to: email,
    subject: "Redefinição de Senha",
    text: `
      Olá,
  
      Recebemos um pedido para redefinir sua senha. Sua nova senha é:
  
      **${novaSenha}**
  
      Se você não solicitou a redefinição de senha, por favor, desconsidere este email.
  
      Agradecemos por utilizar nossos serviços!
  
      Atenciosamente,
      Equipe SIGMA
    `,
  };


  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({
        erro: true,
        mensagem: "Erro ao enviar email: " + error.message,
      });
    }
    return res.json({
      erro: false,
      mensagem: "Nova senha enviada para seu email!",
    });
  });
});

app.get("/backend/pacientes/:id/consultas", async (req, res) => {
  const pacienteId = req.params.id;

  try {
    const consultas = await Enquiry.findAll({
      where: { paciente: pacienteId },
      include: [
        {
          model: Doctor,
          attributes: ['id', 'name', 'crm', 'especialidade'],
          include: [
            {
              model: Specialty,
              as: 'specialty', 
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    if (consultas.length === 0) {
      return res.status(404).json({
        erro: true,
        mensagem: "Nenhuma consulta encontrada para o paciente fornecido.",
      });
    }

    return res.json({
      erro: false,
      dados: consultas,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao buscar consultas: " + error.message,
    });
  }
});


app.put("/backend/consulta/:id/resumo", eAdmin, async (req, res) => {
  const id = req.params.id;
  const { resumo } = req.body;

  if (!resumo) {
    return res.status(400).json({
      erro: true,
      mensagem: "O campo 'resumo' é obrigatório!",
    });
  }

  try {
    const consulta = await Enquiry.findByPk(id);

    if (!consulta) {
      return res.status(404).json({
        erro: true,
        mensagem: "Consulta não encontrada!",
      });
    }

    consulta.resumo = resumo;
    consulta.status = "finalizada"; 
    await consulta.save();

    return res.json({
      erro: false,
      mensagem: "Resumo atualizado com sucesso!",
      dados: consulta,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao atualizar o resumo: " + error.message,
    });
  }
});

app.delete("/backend/consultas/:id", async (req, res) => {
  const consultaId = req.params.id;

  try {
    // Tente encontrar a consulta pelo ID
    const consulta = await Enquiry.findByPk(consultaId);
    
    if (!consulta) {
      return res.status(404).json({
        erro: true,
        mensagem: "Consulta não encontrada.",
      });
    }

    // Deletar a consulta
    await consulta.destroy();

    // Atualizar a tabela attendance_statuses: Incrementar a contagem de "Não Compareceram"
    const attendanceStatus = await AttendanceStatus.findOne({
      where: { status: 'Não Compareceram' },
    });

    if (attendanceStatus) {
      // Incrementa o valor de "count" na coluna "status"
      attendanceStatus.count += 1;
      await attendanceStatus.save();
    } else {
      // Se não encontrar o status "Não Compareceram", podemos criar um novo registro com count = 1
      await AttendanceStatus.create({
        status: 'Não Compareceram',
        count: 1,
      });
    }

    return res.json({
      erro: false,
      mensagem: "Consulta excluída com sucesso.",
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao excluir consulta: " + error.message,
    });
  }
});

app.get("/backend/dashboard", async (req, res) => {
  try {
    const monthlyConsultations = await MonthlyConsultation.findAll({
      attributes: ['month', 'year', 'consultation_count'],
      order: [['year', 'ASC'], ['month', 'ASC']],
    });


    const attendanceTypes = await AttendanceType.findAll({
      attributes: ['type', 'count'],
    });

    const specialtyRankings = await SpecialtyRanking.findAll({
      attributes: ['specialty', 'consultation_count'],
      order: [['consultation_count', 'DESC']],
    });

    const attendanceStatus = await AttendanceStatus.findAll({
      attributes: ['status', 'count'],
    });

    const response = {
      monthlyConsultations: monthlyConsultations.map((item) => ({
        month: item.month,
        year: item.year,
        count: item.consultation_count,
      })),
      attendanceTypes: attendanceTypes.map((item) => ({
        type: item.type,
        count: item.count,
      })),
      specialtyRankings: specialtyRankings.map((item) => ({
        specialty: item.specialty,
        count: item.consultation_count,
      })),
      attendanceStatus: attendanceStatus.map((item) => ({
        status: item.status,
        count: item.count,
      })),
    };

    return res.json({
      erro: false,
      dados: response,
    });
  } catch (error) {
    return res.status(400).json({
      erro: true,
      mensagem: "Erro ao buscar dados do dashboard: " + error.message,
    });
  }
});


// SERVER RODANDO
app.listen(3000, () => {
  console.log("Servidor Iniciado: Servidor Inicido : http://localhost:3000/backend")
});

module.exports = app;
