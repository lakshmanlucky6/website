const exp = require('express')
const app = exp()
const mongoClient = require('mongodb').MongoClient;
const userApp = require('./API/user-api')
const authorApp = require('./API/author-api')
const adminApp = require('./API/admin-api')
const path = require('path')
app.use(exp.json())

//connect react build with server
app.use(exp.static(path.join(__dirname,'../frontend/build')))


const dbUrl = 'mongodb://localhost:27017'
mongoClient.connect(dbUrl)
.then(client=>{
    const dbObj= client.db('pvpblogdb')
    const usersCollection = dbObj.collection('users')   
    const authorCollection = dbObj.collection('authors')
    const adminCollection = dbObj.collection('admin')
    const articleCollection = dbObj.collection('articles')
    app.set('usersCollection',usersCollection);
    app.set('adminCollection',adminCollection);
    app.set('authorCollection',authorCollection);
    app.set('articleCollection',articleCollection);
    console.log("DB connection successful")
})
.catch(err => {
    console.log('Error in DB connection : ',err.message);
})


app.use("/user-api",userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)


//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",payload:err.message})
})


const port = 4000;
app.listen(port,()=>{
    console.log(`http server on port ${port}`)})