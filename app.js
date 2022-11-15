const express = require("express"); //to use express
const bodyParser = require("body-parser"); //body parser json<->string
const path = require("path"); //path to join static etc
const db = require("./config/database"); //to import config file

var axios = require("axios"); //google it

//Authenticate the database
db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Error: " + err));

//to utilize express app
const app = express();

//The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

//To mess around with json objects
app.use(express.json());

//here ejs is set as ejs --- BUT --- you can also use handlebars
app.set("view-engine", "ejs");

//load static objects  --- so that our app can use public folder now
app.use(express.static(path.join(__dirname, "public")));

//for parsing and getting around with json objects
app.use(bodyParser.json());

// --------------------------YOUR CODE GOES HERE--------------------------------

const Table1 = require("./models/table1"); //This will be used when action is post and we have to send data to backend(used to create tuples so that it can be inserted to table at backed)

// STATIC RENDERING
// app.get("/",(req,res)=>{
//     res.render("statichome.ejs")             //this will render statichome.ejs fie(html)
// })

// DYNAMIC RENDERING
// Be cautious -- always use async await in db queries
app.get("/", async function (req, res) {
  let query = `SELECT * FROM table1s`;
  const [results] = await db.query(query);
  console.log(results);
  res.render("home.ejs", { project: results }); //This project will contain rows which will dynamically shown in home.ejs
});

app.get("/sign_up", (req, res) => {
  res.render("sign_up.ejs");
});

//SENDING DATA TO SERVER
app.post("/usersignup", async (req, res) => {
  try {
    Table1.create({
      u_name: req.body.name, //req.body.(check in the form attribute name of name)
      email: req.body.email, //req.body.(check in the form attribute name of email)
      age: req.body.age,
      mobile: req.body.mobile,
    });
    res.redirect("/");   //if you use redirect it must be handled in api or else use render
  } catch {
    res.redirect("/sign_up");
  }
});

// ----------------------------------------------------------------------------
app.listen(5000);
