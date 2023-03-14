var express = require("express");
var app = express();
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
var urlencodedParser = app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mytodo",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS mytodo;", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  let table =
    "CREATE TABLE IF NOT EXISTS todolist (todo_id INT AUTO_INCREMENT PRIMARY KEY,list VARCHAR(255));";
  con.query(table, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  });
});

app.post("/submit", (req, res) => {
  let listData = req.body;
  con.query(
    `INSERT INTO todolist (list) VALUES ('${listData.inputData}')`,
    (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    }
  );
  res.send("Added data");
});

app.get("/gettodo", (req, res) => {
  con.query("SELECT * FROM todolist", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/delete", (req, res) => {
  let idData = req.body;
  let todoId = idData.listId;
  console.log(todoId);
  con.query(
    `DELETE FROM todolist WHERE todo_id = '${todoId}'`,
    (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
