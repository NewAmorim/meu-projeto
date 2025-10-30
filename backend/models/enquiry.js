const Sequelize = require("sequelize");
const db = require("./db");

const Specialty = require('./specialty');
const Doctor = require("./user");
const Patient = require("./patient");

const Enquiry = db.define("enquiries", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  modalidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Specialty,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  medico: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  paciente: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  data: {
    allowNull: false,
    type: Sequelize.DATE
  },
  horario: {
    allowNull: false,
    type: Sequelize.STRING
  },
  resumo: {
    type: Sequelize.TEXT('long'), 
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('pendente', 'finalizada'),
    allowNull: false,
    defaultValue: 'pendente', 
  },
}, {
  timestamps: true,
});

Enquiry.belongsTo(Patient, { foreignKey: 'paciente' });
Enquiry.belongsTo(Doctor, { foreignKey: 'medico' });


module.exports = Enquiry;
