const request = require("supertest");
const app = require("./App");
const Doctor = require("./models/user");
const Specialty = require("./models/specialty");
const Patient = require("./models/patient");
const Enquiry = require("./models/enquiry");

describe("API Endpoints - More Tests", () => {
    let token;
    let patientToken;

    beforeAll(async () => {
        await request(app)
            .post("/backend/cadastrar")
            .send({
                name: "Test Doctor",
                email: "testdoctor@example.com",
                password: "123456",
                crm: "123456",
                especialidade: 1,
                endereco: "Test Street, 123"
            });

        const loginResponse = await request(app)
            .post("/backend/login")
            .send({ email: "testdoctor@example.com", password: "123456" });
        token = loginResponse.body.token;

        await request(app)
            .post("/backend/cadastrar/paciente")
            .send({
                name: "Test Patient",
                data_nascimento: "01/01/1990",
                genero: "feminino",
                cpf: "123.456.789-00",
                cid_card: "000.000.002",
                endereco: "Patient Street, 456",
                email: "testpatient@example.com",
                password: "123456",
            });

        const patientLoginResponse = await request(app)
            .post("/backend/login/paciente")
            .send({ email: "testpatient@example.com", password: "123456" });
        patientToken = patientLoginResponse.body.token;
    });

    test("GET /backend/especialidades - deve retornar a lista de especialidades", async () => {
        const response = await request(app)
            .get("/backend/especialidades")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
        expect(response.body.mensagem.specialties).toBeInstanceOf(Array);
    });

    test("POST /backend/contato - deve enviar uma mensagem de contato", async () => {
        const response = await request(app)
            .post("/backend/contato")
            .send({
                name: "Contato Teste",
                email: "contato@example.com",
                message: "Esta é uma mensagem de teste."
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
    });

    test("POST /backend/login/paciente - deve permitir o login do paciente", async () => {
        const response = await request(app)
            .post("/backend/login/paciente")
            .send({ email: "testpatient@example.com", password: "123456" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("mensagem", "Login realizado com sucesso!!");
        expect(response.body).toHaveProperty("token");
    });

    test("GET /backend/medicos - deve retornar todos os médicos com especialidades", async () => {
        const response = await request(app).get("/backend/medicos").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
        expect(response.body.mensagem).toBeInstanceOf(Array);
    });

    test("GET /backend - deve retornar a lista de médicos com dados do servidor", async () => {
        const response = await request(app).get("/backend").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("erro", false);
        expect(response.body.mensagem.doctors).toBeInstanceOf(Array);
    });
});

