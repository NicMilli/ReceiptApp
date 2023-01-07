const express = require('express')
const app = express()
const PORT = process.env.PORT || 2000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/images/py', require('./routes/imagePyRoutes'))

app.listen(PORT, (err) => console.log(err), 
    () => console.log("Server listening on PORT", PORT))

