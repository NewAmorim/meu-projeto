const Sequelize = require("sequelize");
const db = require("./db");

const Specialty = db.define("specialties", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  timestamps: true, // Adiciona timestamps se necessário
});

module.exports = Specialty;
