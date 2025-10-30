// models/contact.js
const Sequelize = require("sequelize");
const db = require("./db");

const Contact = db.define("contacts", {
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
    validate: {
      isEmail: true,
    },
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Contact;
