const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'fcanmekikoglu@gmail.com',
        subject: 'Welcome to the task app!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}
const sendGoodbyeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'fcanmekikoglu@gmail.com',
        subject: `We are really sorry that you're leaving`,
        text: `Thanks for using our app ${name}, let us know why you quit using our app`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}