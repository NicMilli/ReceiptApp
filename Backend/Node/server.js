require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 2000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use('/api/invoice', require('./routes/invoiceRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.listen(PORT, (err) => console.log(err), 
    () => console.log("Server listening on PORT", PORT))

