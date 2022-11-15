const Sequelize=require("sequelize");    //Sequelize is a Node. js-based Object Relational Mapper that makes it easy to work with MySQL, MariaDB, SQLite, PostgreSQL databases, and more. 
const db=require("../config/database")   //connect database

//in define we use same table name as in xampp
//also take care --> in xamp 's' is added at the end of each table. eg: table1s
const Table1=db.define("table1",{               
    u_id:{                               //use same attribute name as in database table
        type:Sequelize.INTEGER,          // mention the type of attribute matching with the sql tables this way
        autoIncrement: true,
        primaryKey: true,
    },
    u_name:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.INTEGER
    },
    mobile:{
        type:Sequelize.STRING
    },
},
{
    timestamps:false
});

//Don't forget to export so that it will be usable further
module.exports=Table1;