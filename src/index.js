//Requirements & imports
const express = require ('express')
require ('./db/mongoose')
//User and Task models of mongoose
const User = require('./models/user')
const Task = require('./models/task')
//Importing routers of users and tasks
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//Handling express app and port
const app = express()
const port = process.env.PORT 

//Format to JSON
app.use(express.json())

//Using routes of users and tasks
app.use(userRouter)
app.use(taskRouter)


//Start server on 3000 or whatever PORT is
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})

