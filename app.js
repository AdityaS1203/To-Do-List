const express=require("express");
const bodyParser=require("body-parser");
const PORT=3001||process.env.PORT;
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const mongoose= require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Adi:123@cluster0.rp4xp4n.mongodb.net/AmazonWebScrap");

//since we're using ejs and there are a lot more method to do its job .hence we need to mention that we are using ejs

app.set("view engine","ejs");
app.use(express.static("public"));


const taskSch=new mongoose.Schema({
  name:String
});

const item=mongoose.model("item",taskSch);


app.get("/",function(req,res){
  const a=item.find()
    .then(kaamKiList=>{
      const arr=[];
      for(var i=0;i<kaamKiList.length;i++){
        arr.push(kaamKiList[i].name)
      }
      res.render("list",{newlistitem:arr});
    })
    .catch(err=>{
      console.log(err);
    });
});

app.post("/",function(req,res){
  var entered=req.body.task
  const taskItem=new item({
    name:entered
  });
  if(entered.trim().length!==0){
    taskItem.save()
  }
  res.redirect("/")
})

app.get("/delete",function(req,res){
  const a=item.find()
    .then(kaamKiList=>{
      const arr=[];
      for(var i=0;i<kaamKiList.length;i++){
        arr.push(kaamKiList[i].name)
      }
      res.render("list",{newlistitem:a});
    })
    .catch(err=>{
      console.log(err);
    })
});

app.post("/delete",function(req,res){
  const btnNo=req.body.btn;
  item.find()
    .then(kaamKiList=>{
      const a=[];
      for(var i=0;i<kaamKiList.length;i++){
        a.push(kaamKiList[i].name)
      }
      var naam=a[btnNo];
      item.deleteOne({name:naam})
        .then(()=>{
          console.log("deletion successful");
          res.redirect("/");
        })
        .catch(err=>{
          console.log(err);
        })
    
  })
    .catch(err=>{
      console.log(err);
    });
    
});


app.listen(PORT,function(){
  console.log("server for to do list is running");
});
