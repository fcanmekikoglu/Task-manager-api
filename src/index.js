const app = require('./app')
const port = process.env.PORT 

//Start server on 3000 or whatever PORT is
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})

