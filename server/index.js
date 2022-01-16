const express = require("express")
const app = express();
const cors = require("cors")
const pool = require('./db')

app.use(cors())
app.use(express.json())

// add todo
app.post("/todos", async(req, res) => {
    try {
        const title = req.body.title;
        const pages = req.body.pages;
        const completed = req.body.completed;
        const ren = req.body.ren;
        const newTodo = await pool.query(
        'INSERT INTO todos (title, pages, completed, ren) VALUES($1, $2, $3, $4)', 
        [title, pages, completed, ren])

        res.json(newTodo)

    } catch (error) {
        console.error(error.message)
    }
})


app.listen(5000, () => {
    console.log('server started on 5000 port')
})

