const express = require("express")
const colors = require("colors")
const path = require("path")
const nocache = require('nocache')

const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

app.use(express.static('static'))
app.use(express.json()); //Used to parse JSON bodies
app.use(nocache())
// app.use(express.urlencoded()); //Parse URL-encoded bodies

let pool_responses = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/html/index.html"))
})

app.get('/poll', (req, res) => {
    pool_responses.push(res)
})

app.post('/message', (req, res) => {
    let json_data = req.body
    for (let res of pool_responses) {
        console.log(json_data)
        res.json(json_data)
    }
    pool_responses = []
    res.send('ok')
})

app.listen(PORT, function () {
    console.log(`start serwera na porcie ${PORT}`)
    console.log(`http://localhost:${PORT}`.cyan)
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
})