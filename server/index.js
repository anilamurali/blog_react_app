const Express=require('express');
const Mysql=require('mysql');
const Cors=require('cors');
const { request } = require('express');
const app=Express();

app.use(Cors());
app.use(Express.json());
const con=Mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"blogdb"
})
app.post("/post",(req,res)=>{
    const {heading, content, author} =req.body;
    const sqlInsert =
    "INSERT INTO `blog`(`heading`, `content`, `author`) VALUES (?, ?, ?)";
    con.query(sqlInsert, [heading,content,author], (error,result)=>{
      if(error){
        console.log(error);
      }
    });
});
app.get("/viewblog", (req, res) => {
    con.query("SELECT * FROM blog", (err, result) => {
      if (err) 
      {
        throw err;
      }
      res.send(result);
    });
  });
  app.get("/viewblog/:id", (req, res) => {
    const { id } = req.params;
    con.query("SELECT * FROM blog WHERE id=? ", id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });


  app.delete("/remove/:id",(req,res)=>{
    const { id } = req.params;
    const sqlRemove = "DELETE FROM blog WHERE id = ?";
    con.query(sqlRemove, id, (error, result)=>{
      if (error){
        console.log(error);
      }
    });
  });


  app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { heading, content, author } = req.body;
    const sqlUpdate = "UPDATE blog SET heading = ?, content = ?, author= ?  WHERE id = ?";
    con.query(sqlUpdate, [heading, content, author, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });
   
  app.post("/login",(req,res) =>{
    const email=req.body.email;
    const password=req.body.password;
    const {id}=req.params;
    con.query("SELECT * FROM user WHERE email=? AND password=?",[email,password],(err,result)=>{
      if (err) throw err;
      res.send(result);

    });
  });

  app.post("/register",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const password=req.body.password;

    con.query("insert into user (name,email,mobile,password) values(?,?,?,?)",[name,email,mobile,password],(err,result)=>{
        if(err)
        {
            throw err;
        }
        res.send("inserted successfully")
    })
})
  app.listen(8080,()=>{
    console.log("server running");
})
