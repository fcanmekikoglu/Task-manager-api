const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, userTwoId, userTwo, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

//TESTS FOR SIGNUP
test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Can mekikoglu',
            email: 'fcanmekikoglu@gmail.com',
            password: 'Sifrem123123'
        }).expect(201)

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Can mekikoglu',
            email: 'fcanmekikoglu@gmail.com',
        },
        token: user.tokens[0].token
    })
    //Make sure psw is hashed
    expect(user.password).not.toBe('Sifrem123123')
})

test('Should not signup a new user with invalid credentials', async () => {
    const invalidName = {
        name: '',
        email: 'example@mail.com',
        password: 'Sifremmm123'
    }
    const invalidMail = {
        name: 'Can Mekikoğlu',
        email: 'example@mail',
        password: 'Sifremmm123'
    }
    const invalidPswOne = {
        name: 'Can Mekikoğlu',
        email: 'example@mail.com',
        password: 'Sifreemmmpassword'
    }
    const invalidPswTwo = {
        name: 'Can Mekikoğlu',
        email: 'example@mail.com',
        password: 'asd'
    }

    await request(app)
        .post('/users')
        .send(invalidName)
        .expect(400)
    await request(app)
        .post('/users')
        .send(invalidMail)
        .expect(400)
    await request(app)
        .post('/users')
        .send(invalidPswOne)
        .expect(400)
    await request(app)
        .post('/users')
        .send(invalidPswTwo)
        .expect(400)
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

//TESTS FOR LOGIN
test('Should not login with not existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: "nonExistentPass123!"
        }).expect(400)
})

//TESTS FOR READ
test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

//TESTS FOR DELETE
test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

//TEST FOR AVATAR
test('Should uplaod avatar img', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

//TESTS FOR UPDATE
test('Should update valid user fields', async () => {
    const updateField = {
        name: "Can Mekikoğluu"
    }
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(updateField)
        .expect(200)


    expect(response.body.name).toEqual(updateField.name)
})
test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', ``)
        .send({
            name: "Can Mekikoğluuu"
        })
        .expect(401)
})

test('Should not update invalid user fields', async () => {
    const updateField = {
        location: "Ankara"
    }
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send(updateField)
        .expect(400)
})

test('Should not update user with invalid name/email/password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: ''
        })
        .expect(400)
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'hhhh@mail'
        })
        .expect(400)
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'şifrepassword'
        })
        .expect(400)
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'asd'
        })
        .expect(400)
})
