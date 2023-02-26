const express = require('express');
const Datastore = require('nedb');
const path = require('path');
const router = express.Router();

const app = express();
//load database
const database = new Datastore('database.db');
database.loadDatabase();
//start server
app.listen(3000, () => console.log('listening at 3000'));

//initial includes
app.use(express.static('public'));
app.use(express.json({"limit":"1mb"}));

//routes
router.get('/log',function(req,res){
    console.log("tried");
    res.sendFile(path.join(__dirname+'/public/login.html'));
    //__dirname : It will resolve to your project folder.
});

//apis
app.post('/login', (request,response) => {
    response.json({
        status:"success"
    });
});


//sign in
app.post('/find', (req,res) => {
    database.find({Email:req.body.email},(err,data)=>{
        res.json({
            userData: data
        });
    })  
});
//add user
app.post('/add-user', (request,response) => {
    addNewUser(request.body.user,request.body.email,request.body.password);
    response.json({
        status:"success"
    });
});

//verify user
app.post('/verify', (req,res) => {
    let response = "a";
    database.find({Email:req.body.email},(err,data)=>{

        if(req.body.password === data[0].Password){
            response = "verified";
            
        }else{
            response = "bad_password";
        }
        res.json({
            status:response
        });
    })
});


//update database
app.post('/update-data', (request,response) => {
    database.update({_id: request.body.id}, 
    {$set: {Notes:request.body.notes}}, {}, err => {
    console.log(err);
    })

    database.find({_id:request.body.id},(err,data)=>{
        response.json({
            userData: data
        });
    })
});

//update UI
app.post('/get-data', (request,response) => {
    database.find({_id:request.body.id},(err,data)=>{
        response.json({
            userData: data
        });
    })
});


//db datatype

//db functions
function loginUser(userName,Password){
    const isUser = findUser(userName);
    if(isUser != false){
        const userData = matchCredentials(userName,Password);
        if(userData == true){
            return true;
        }
        else{
            return "wrongPassword";
        }
    }else{
        return "NoAccount";
    }
}

//check presence//
function matchCredentials(userEmail,password){
    const data = findUser(userEmail);
}

function addNewUser(username,userEmail,password){
    let newData= {
        Name : username,
        Email : userEmail,
        Password : password,
        Notes : "[]"
    }
    database.insert(newData);
}

function updateData(username,password,data){

}