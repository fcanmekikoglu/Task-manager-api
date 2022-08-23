const request = require ('supertest')
const app =  require('../src/app')

test('Should signup a new user', async ()=>{
    await request(app).post('/users').send({
        name: 'Can mekikoglu',
        email: 'fcanmekikoglu@gmail.com',
        password: 'Sifrem123123'
    }).expect(201)
})
    