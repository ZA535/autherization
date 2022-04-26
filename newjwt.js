const { response } = require('express');
const express=require('express');
const jsonwebtoken=require('jsonwebtoken');

const app=express();

app.get('/api',(req,res)=>{
       res.json({
           Welcome:"Welcome to Json web token API"
        })
})
app.post('/api/posts',verifyToken,(req,res)=>{
    jsonwebtoken.verify(req.token, 'zain786', (err,data) =>{
        if(err){
            res.sendStatus(403)
        }else{
        res.json({
            message : "Post Created.....................",
            data
          } )
        }
      });
   
})
app.post('/api/login',(req,res)=>{
    const user={
        id:1,
        name:"ZAIN UL ABIDEEN",
        email:"ulabideenz40@gmail.com",
        address:"chak no 69eb ogroo arifwala."
    }
    jsonwebtoken.sign({user}, "zain786",(err,token)=>{
   
    res.json({
        token
    })
    });
})
function verifyToken(req,res, next){
    const tokenlogin=req.headers['authorization'];
    if (tokenlogin!='undefined'){
     req.token=tokenlogin
     next();
    }
   else{
       res.sendStatus(403)
   }
}
app.listen(1000,()=>console.log("Server is start at port 1000"))