const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb+srv://admin-sumit:sc1645@%23@cluster0.cxlc3.mongodb.net/BlogDB', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(PORT,()=>{
        console.log('server started at PORT 4000');
    })
});
let userQNA;
const answersList=[];
const userSchema = new mongoose.Schema({
    name: String,
    password:String
  });
  const querySchema = new mongoose.Schema({
    username: String,
    question:String,
  },{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
}
  );
  const userAnswerSchema = new mongoose.Schema({
    name: String,
    question:String,
    user_answer:String
  });
  const User = mongoose.model('User',userSchema);
  const Query = mongoose.model('Query',querySchema);
  const UserAnswer=mongoose.model('UserAnswer',userAnswerSchema);
app.post("/register",async (req, res)=> {
    console.log(req.body);
    const {userName,userPass} = req.body;
    const checkName=await User.findOne({name:userName}).exec();
    if(checkName){
        res.status(500);
        res.json({
            message:"user already exist"
        });
       return;   
    }
    const user = new User({ name: userName,password:userPass });
      user.save((err)=>{
          if(!err)
          console.log('Saved Successfully');
      })
  res.json({
      message:"succes"
  });
});
app.post("/login",async (req, res)=> {
    console.log(req.body);
    const {userName,userPass} = req.body;
    const checkName=await User.findOne({name:userName}).exec();
    console.log(checkName);
    if(!checkName || checkName.password!==userPass){
        res.status(403);
        res.json({
            message:"invalid login"
        });
       return;   
    }
  res.json({
      message:"succes"
  });
});
app.post("/",async (req,res)=>{
     const {username,question}=req.body;
     // console.log(username);
      const query=new Query({username:username,question:question});
        query.save((e)=>{
            if(!e)
             console.log('Questions added to database');
        })
        const data=await Query.find({}).sort({created_at: -1});
        data.reverse();
    res.send(data);
}
);
app.get("/queries",async (req,res)=>{
    const {username,question}=req.body;
    // console.log(username);
     
       const data=await Query.find({});
       data.reverse();
   res.send(data);
});

app.post("/user",async(req,res)=>{
     const {_id,username,question}=req.body;
     userQNA=req.body;
     console.log(userQNA);
     res.send(req.body);  
})

app.get("/user",async(req,res)=>{
    res.send(userQNA);  
})
 
app.post("/answer",async (req,res)=>{
    answersList.push(req.body);
    const element=req.body;
      console.log('our response',element);
      const query=new UserAnswer({name:element.userName,question:element.ques,user_answer:element.answer});
        query.save((e)=>{
            if(!e)
             console.log('Answer added to database');
        })
    await Query.deleteOne({ _id: userQNA.key }, function (err) {
        if (!err)
         console.log('data deleted successfully')
      });
    res.send(answersList);
});
app.get("/answer",async (req,res)=>{
    const data=await UserAnswer.find({});
    res.send(data.reverse());
});