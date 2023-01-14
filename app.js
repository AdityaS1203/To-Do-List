const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/toDoItems");
mongoose.set('strictQuery', false);
//since we're using ejs and there are a lot more method to do its job .hence we need to mention that we are using ejs

app.set("view engine","ejs");
app.use(express.static("public"));


const taskSch=new mongoose.Schema({
  name:String
});

const item=mongoose.model("item",taskSch);


app.get("/",function(req,res){
  const a=item.find(function(err,kaamKiList){
    if(err){
      console.log(err);
    }
    else{
      const arr=[];
      for(var i=0;i<kaamKiList.length;i++){
        arr.push(kaamKiList[i].name)
      }
      res.render("list",{newlistitem:arr});
    }
  });
});

app.post("/",function(req,res){
  var entered=req.body.task;
  const taskItem=new item({
    name:entered
  });
  if(entered.trim()){
    taskItem.save();
  }
res.redirect("/");
});

app.get("/delete",function(req,res){
  const a=item.find(function(err,kaamKiList){
    if(err){
      console.log(err);
    }
    else{
      const a=[];
      for(var i=0;i<kaamKiList.length;i++){
        a.push(kaamKiList[i].name)
      }
      res.render("list",{newlistitem:a});
    }
  });
});

app.post("/delete",function(req,res){
  const btnNo=req.body.btn;
  item.find(function(err,kaamKiList){
    if(err){
      console.log(err);
    }
    else{
      const a=[];
      for(var i=0;i<kaamKiList.length;i++){
        a.push(kaamKiList[i].name)
      }
      var naam=a[btnNo];
      item.deleteOne({name:naam},function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("deletion successful");
        }
      });
    }
  });
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("server for to do list is running");
});
