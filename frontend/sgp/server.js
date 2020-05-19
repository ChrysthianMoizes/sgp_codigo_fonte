const express = require('express')
const app = express()

app.use(express.static(__dirname + '/dist/sgp'))

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/sgp/index.html')
})

app.listen(process.env.PORT || 80)
