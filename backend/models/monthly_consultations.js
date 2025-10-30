const Sequelize = require("sequelize");
const db = require("./db");

const MonthlyConsultation = db.define("monthly_consultations", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  consultation_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = MonthlyConsultation;
