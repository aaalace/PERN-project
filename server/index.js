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
        'INSERT INTO todo (title, pages, completed, ren) VALUES($1, $2, $3, $4) RETURNING *', 
        [title, pages, completed, ren])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get todo by id
app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update todo title
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        const {title} = req.body
        await pool.query('UPDATE todo SET title = $1 WHERE id = $2', [title, id])
        res.json("updated")
    } catch (error) {
        console.error(error.message)
    }
})

// delete todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params
        await pool.query('DELETE FROM todo WHERE id = $1', [id])
        res.json("deleted")
    } catch (error) {
        console.error(error.message)
    }
})

// delete all todos
app.delete("/todos", async(req, res) => {
    try {
        const del = await pool.query('DELETE FROM todo')
        res.json("deleted all")
    } catch (error) {
        console.error(error.message)
    }
})




app.listen(5000, () => {
    console.log('server started on 5000 port')
})

