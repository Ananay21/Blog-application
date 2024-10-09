import express from "express";
import ejs from "ejs";
import bodyparser from "body-parser";

const dt=new Date();
const thisYear=dt.getFullYear();
let postArr=[];
const app= express();
const port=3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("home.ejs",{
        postVector:postArr,
        year:thisYear,
    });
});

app.get("/create",(req,res)=>{
    res.render("post.ejs",{year:thisYear});
});

app.post("/create",(req,res)=>{
    const postObj={
        title:req.body["title"],
        subtitle:req.body["subTitle"],
        post:req.body["postPara"],
    };
    if((postObj.title.length===0)||(postObj.subtitle.length===0)||(postObj.post.length===0)){
        res.redirect("/create");
    }
    else{
        postArr.push(postObj);
        console.log(postArr);
        res.redirect("/");
    }
});

app.get("/singlePost",(req,res)=>{
    res.render("singlePost.ejs");
});

app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{year:thisYear});
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});
