const Sequelize = require("sequelize");
const db = require("./db");

const Patient = db.define("patients", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cid_card: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});



module.exports = Patient;
