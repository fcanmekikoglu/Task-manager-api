const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

//Create user ID for userOne
const userOneId = new mongoose.Types.ObjectId()

//Create valid user
const userOne = {
    _id: userOneId,
    name: "Meltem",
    email: "meltem@mail.com",
    password: '123What!!!!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}
//Create user ID for userTwo
const userTwoId = new mongoose.Types.ObjectId()

//Create valid user
const userTwo = {
    _id: userTwoId,
    name: "Can",
    email: "can@mail.com",
    password: '123What!!!!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Thirdtask",
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    //Delete everything before every test case and save valid user and tasks to db
    
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}