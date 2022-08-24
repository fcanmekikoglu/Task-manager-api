const request = require ('supertest')
const app =  require('../src/app')
const User = require('../src/models/user')

//Create valid user
const userOne = {
    name: "Meltem",
    email: "meltem@mail.com",
    password: '123What!!!!!'
}

//Delete everything before every test case and save valid user to db
beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()    
})

//Signup test with valid user
test('Should signup a new user', async ()=>{
    await request(app).post('/users').send({
        name: 'Can mekikoglu',
        email: 'fcanmekikoglu@gmail.com',
        password: 'Sifrem123123'
    }).expect(201)
})

//Login test with valid user
test('Should login existing user', async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

//Login test with non-valid credentials is expected to crash (400) 
test('Should not login with not existing user', async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: "nonExistentPass123!"
    }).expect(400)
})