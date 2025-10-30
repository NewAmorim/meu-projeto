const Sequelize = require("sequelize");
const db = require("./db");

const AttendanceStatus = db.define("attendance_status", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  status: {
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

module.exports = AttendanceStatus;
