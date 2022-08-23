//Requirements & imports
const express = require ('express')
require ('./db/mongoose')
//User and Task models of mongoose
const User = require('./models/user')
const Task = require('./models/task')
//Importing routers of users and tasks
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//Handling express app 
const app = express()

//Format to JSON
app.use(express.json())

//Using routes of users and tasks
app.use(userRouter)
app.use(taskRouter)


module.exports=app

