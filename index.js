import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const URL="https://api.jikan.moe/v4/random";


app.get("/",(req,res)=>{
    res.render("login.ejs");
})

app.post("/submit",(req,res)=>{
    if(req.body.username.trim()=="mighty" && req.body.password=="warrior3490")
    {
        res.render("index.ejs");
    }
    else{
        res.render("login.ejs",{wrong:"Wrong Credentials"})
    }
})
app.get("/log",(req,res)=>{
    res.redirect("/");
})
app.get("/home",(req,res)=>{
    res.render("index.ejs");
})

app.get("/get",async(req,res)=>{
    const category=req.query.category;
    switch(category)
    {
        case "anime":
            try {
                const response = await axios.get(URL + "/anime");
                const result = response.data;
                const d=result.data;
                res.render("view.ejs",{url:result.data.images.jpg.large_image_url,
                                       title:d.title_english,
                                       type:d.type,
                                       genre:d.genres[1].name,
                                       source:d.source,
                                        episodes:d. episodes,
                                       status:d.status,
                                       released:d.aired.string,
                                       duration:d.duration,
                                       synopsis:d.synopsis});
              } catch (error) {
                res.send("sorry try again");
              }
            break;
        case "character":

            try {
                const response = await axios.get(URL + "/characters");
                const result = response.data;
                const d=result.data;
                res.render("char.ejs",{src:d.images.jpg.image_url,name:d.name,
                 nickname:d.nicknames[1],
                about:d.about});
            }
            catch(error)
            {
                res.send("sorry try again");
            }
            break;
              
    }
})







app.listen(port,()=>{
    console.log("server listening on port 3000");
})