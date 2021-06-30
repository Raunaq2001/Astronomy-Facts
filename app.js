const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true}));
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const apiKey="4UUm3213aY5aGynvfXLXnJmFbChKPYvUfrbKEyqp";
  const url="https://api.nasa.gov/planetary/apod?api_key="+apiKey+"&count=1";
  https.get(url,function(response){
    response.on("data",function(data){
      const dataRecerive=JSON.parse(data);
      const date=dataRecerive[0].date;
      const explanation=dataRecerive[0].explanation;
      const title=dataRecerive[0].title;
      const imageURL=dataRecerive[0].url;
      myObj={
        date: date,
        explanation: explanation,
        title: title,
        imageURL: imageURL
      };
      res.render("facts",{Obj:myObj});
    });
  });
});
app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Listening to Port 3000");
});
