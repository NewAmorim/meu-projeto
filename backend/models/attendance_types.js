const Sequelize = require("sequelize");
const db = require("./db");

const AttendanceType = db.define("attendance_types", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = AttendanceType;
