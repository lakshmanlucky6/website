const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middleware/verifyToken')
let userCollection,articleCollection;
userApp.use((req,res,next)=>{
    userCollection = req.app.get('usersCollection');
    articleCollection = req.app.get('articleCollection');
    next()
})

userApp.get('/test-user',verifyToken,async(req,res)=>{
    let userList = await userCollection.find().toArray()
    res.send({payload:userList})
})

userApp.post('/register',async(req,res)=>{
    let newUser = req.body
    let dbUser = await userCollection.findOne({username:newUser.username})
    if(dbUser!= null){
        return res.send({message:"User already existed"});
    }
    //used to hash the password min value of salt is 1 and max is 10    
    let hashedPassword = await bcryptjs.hash(newUser.password,6)
    //replace plain password with hashed password
    newUser.password = hashedPassword;
    await userCollection.insertOne(newUser)
    res.send({message:"user created"})
    
})

userApp.post('/login',async(req,res)=>{
    const credObj = req.body;
    let dbAuthor = await userCollection.findOne({username:credObj.username})
    if(dbAuthor===null){
        res.send({message:"invalid username"})
    }else{
        let result = await bcryptjs.compare(credObj.password,dbAuthor.password)
        //if passwords not match ed
        if(result === false){
            res.send({message:"Invalid password"})
        }else{
            //create token
            let signedToken = jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:"10d"})
            delete dbAuthor.password; //remove the possword to frontend 
            res.send({message:"login success",token:signedToken,author:dbAuthor})
        }
        //returns true or false
    }
})

//read all articles
userApp.get('/articles',verifyToken,async(req,res)=>{
    let articlesList = await articleCollection.find({status:true}).toArray();
    res.send({payload:articlesList});
})

//add comment by user
userApp.put('/article/:articleId/comment',verifyToken,async(req,res)=>{
    //get comment
    let commentObj = req.body; 
    //get articleId from url
    let articleIdOfUrl = req.params.articleId;
    //add comment
    let latestComment = await articleCollection.findOneAndUpdate(
        {articleId:articleIdOfUrl},
        {$addToSet:{comments:commentObj}},
        {returnDocument:"after"}
    )
    res.send({message:"comment added to article",payload:latestComment});
})
module.exports = userApp