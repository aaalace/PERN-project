const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.listen(5000, () => {
    console.log('server started on 5000 port')
})

