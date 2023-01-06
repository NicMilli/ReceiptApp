const {spawn} = require('child_process')

const data = '../SampleData/receipt5.jpg'

const stringifiedData = JSON.stringify(data)

const py = spawn('python', ['../Python/Functions/upload.py', stringifiedData]);

py.stdout.on('data', (data) => {
    console.log(`stdout: data received from node ${data}`)
})


py.stdout.on('close', (code) => {
    console.log(`exited with code ${code}`)
})

// const express = require('express')
// const bodyParser = require('body-parser')
// const {spawn} = require('child_process');



// const py = spawn('python', ["-u", '../Python/Functions/upload.py', stringifiedData])
// // const py = s.spawn('py', ['../Python/Functions/upload.py', stringifiedData])

// py.stdout.on('data', (data)  => {
//     console.log('hi from node')
//     console.log(data.toString())
// })

// py.stdout.on('end', () =>{
//     console.log('goodbye')
// })

// py.stdout.on('end', function() {
//     return console.log('resString is')
    // let resData = JSON.parse(resString)

    // let image = resData['upgraded_image']

    // console.log('your image is', image)
// })

py.stdout.on('error', (err) => {
    console.log(err)
})

// const app = express()

// app.use(bodyParser.urlencoded({extended: false}))

// app.listen(5000)

