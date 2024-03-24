const exp = require('express')
const authorApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../Middleware/verifyToken')

let authorCollection,articleCollection;
authorApp.use((req,res,next)=>{
    authorCollection = req.app.get('authorCollection');
    articleCollection = req.app.get('articleCollection');
    next()
})

authorApp.get('/test-author',verifyToken,async(req,res)=>{
    let authorList = await authorCollection.find().toArray()
    res.send({payload:authorList})
})
//create author
authorApp.post('/register',async(req,res)=>{
    let newAuthor = req.body
    let dbAuthor = await authorCollection.findOne({username:newAuthor.username})
    if(dbAuthor!= null){
        return res.send({message:"Author already existed"});
    }
    //used to hash the password min value of salt is 1 and max is 10    
    let hashedPassword = await bcryptjs.hash(newAuthor.password,6)
    //replace plain password with hashed password
    newAuthor.password = hashedPassword;
    await authorCollection.insertOne(newAuthor)
    res.send({message:"author created"})
    
})
//login author
authorApp.post('/login',async(req,res)=>{
    const credObj = req.body;
    let dbAuthor = await authorCollection.findOne({username:credObj.username})
    if(dbAuthor===null){
        res.send({message:"invalid username"})
    }else{
        let result = await bcryptjs.compare(credObj.password,dbAuthor.password)
        //if passwords not matched
        if(result === false){
            res.send({message:"Invalid password"})
        }else{
            //create token
            let signedToken = jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:"10d"})
            //10 => 10 sec
            //"10d" => 10 days
            //"10" =>10 min
            //"10w" => 10 weeks
            //send token as response
            res.send({message:"login success",token:signedToken,author:dbAuthor})

        }
        //returns true or false
    }
})
//add article
authorApp.post('/article',verifyToken,async(req,res)=>{
    //get new article
    const newArticle = req.body;
    //save to articles collection
    await articleCollection.insertOne(newArticle);
    res.send({message:"new article added"});
})

//delete or restore article
//read articles
//this is not required
authorApp.get('/articles/:username',verifyToken,async(req,res)=>{
    //get author username
    let authorUsername = req.params.username;
    //get articles
    let authorArticlesList = await articleCollection.find({username:authorUsername}).toArray();
    res.send({payload:authorArticlesList});
})

//soft-delete article by author and restore
authorApp.put('/articles/:username/:articleId',verifyToken,async(req,res)=>{
    let articleIdOfUrl = req.params.articleId;
    let currentStatus = req.body.status;
    if(currentStatus == false){}
    let removedArticle = await articleCollection.findOneAndUpdate(
        {articleId:articleIdOfUrl},
        {$set:{status:currentStatus}},
        {returnDocument:"after"}
    );
    if(currentStatus == true){
        res.send({message:"article restored",payload:removedArticle});
    }else{
        res.send({message:"article removed",payload:removedArticle});
    }
})

//edit article
authorApp.put('/article',verifyToken,async (req,res)=>{
    //get modified article
    let modifiedArticle = req.body;
    //update and send to author
    let updatedArticle = await articleCollection.findOneAndUpdate(
        {articleId:modifiedArticle.articleId},
        {$set:{...modifiedArticle}},
        {returnDocument:"after"}
    );
    res.send({message:"article update successful",payload:updatedArticle})
})

module.exports = authorApp
