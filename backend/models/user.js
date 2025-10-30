const Sequelize = require("sequelize");
const db = require("./db");
const Specialty = require('./specialty'); // Ajuste o caminho conforme sua estrutura de arquivos

const Doctor = db.define("doctors", {
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
  crm: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  especialidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Specialty,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define a associação
Doctor.belongsTo(Specialty, { foreignKey: 'especialidade', as: 'specialty' });

module.exports = Doctor;
