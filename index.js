const express = require('express')
const app = express()
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jay:rkskek12@boilerplate.cequs.mongodb.net/test1?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...')).catch(err => console.log(err))



app.get('/', (req,res) => res.send('Hello, World! dsdsds'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
