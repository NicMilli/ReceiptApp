require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 2000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit: 1000000}));

app.use('/api/invoice', require('./routes/invoiceRoutes'))
app.use('/api/user', require('./routes/userRoutes'))

app.listen(PORT, (err) => console.log(err), 
    () => console.log("Server listening on PORT", PORT))

