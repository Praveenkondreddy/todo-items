const { request } = require("express");
const express = require("express")
var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Praveen@123",
  database:"nodemysql"
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});

const app=express()
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});


app.get("/getTasks",(req,res)=>{
  let sql="select * from todoitm"

  let query=db.query(sql,(err,results) =>{
    if(err){
      throw err
    }
    res.send(results)
  })
})

app.post("/addTasks",(req,res)=>{
  console.log("addded")
  console.log(req.body)
  
  let task=req.body
  console.log(task.task)
  let sql=`INSERT INTO todoitm SET ?`;
  let query=db.query(sql,task,err =>{
    if(err){
      console.log("add error")
      throw err
    }
  
  })
  let sql1=`select * from todoitm where id=(select max(id) from todoitm)`

  let query1=db.query(sql1,(err,results) =>{
    if(err){
      throw err
    }
    res.send(results[0])
    console.log(results)
  })
})

app.put("/updateTask/:id",(req,res)=>{
  
  console.log(req.body)
  res.send("updated")
  let {completed}=req.body
  
  let sql=`UPDATE todoitm
  SET completed = ${completed}
  WHERE id=${req.params.id};`;
  let query=db.query(sql,err =>{
    if(err){
      console.log("add error")
      throw err
    }
  
  })
  
})


app.delete("/deleteTasks/:id",(req,res)=>{
 
  let sql=`DELETE FROM todoitm WHERE id=${req.params.id}`;
  let query=db.query(sql,err =>{
    if(err){
      throw err
    }
    console.log("deleted")
    res.send("deleted")
  })
})

app.listen("8080", () => {
  console.log("server started at 8080...")
})