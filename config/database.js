const Sequelize = require("sequelize");                          // package
// templatedb is the name of database (check xampp)
module.exports = new Sequelize("templatedb", "root", "", {       // db name , username , password 
  host: "localhost",
  dialect: "mysql",
});