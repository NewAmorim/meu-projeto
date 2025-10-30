const Sequelize = require("sequelize");
const db = require("./db");

const SpecialtyRanking = db.define("specialty_rankings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  specialty: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  consultation_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = SpecialtyRanking;
