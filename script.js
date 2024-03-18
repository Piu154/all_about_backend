const express = require('express');
const app= express();
app.set("view engine","ejs");
app.use(express.static('./public'));
//  app.use(function(req,res,next){
//     console.log("middlewareWorking");
//   next();
//  })
app.get('/',function(req,res){
    res.render("index");
})
// app.get('/profile',function(req,res){
//     res.send('Hello from profile');
// })
// app.get('/profile/:username',function(req,res){ // dynamic routing
//     res.send(`Hello World ${req.params.username }`)
// })
app.listen(3000 )

//ejs setup 1. ejs install -> npm i ejs
//2. configure ejs -> app.set("view engine","ejs")
//3. make a views folder
//4. make ejs file under views
//5. replace send with render