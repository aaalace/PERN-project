const express = require("express")
const app = express();
const cors = require("cors")
const pool = require('./db')
const path = require("path")
const PORT = process.env.PORT || 3000

// process.env.PORT
// process.env.MODE_ENV => production or undenfined


// middleware

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client/build")))

if(process.env.NODE_ENV == "production"){
    // server static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")))
}

// add todo
app.post("/todos", async(req, res) => {
    try {
        const title = req.body.title;
        const pages = req.body.pages;
        const completed = req.body.completed;
        const ren = req.body.ren;
        const description = req.body.description
        const newTodo = await pool.query(
        'INSERT INTO todo (title, pages, completed, ren, description) VALUES($1, $2, $3, $4, $5) RETURNING *', 
        [title, pages, completed, ren, description])
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
        res.json({'1': req})
        const {id} = req.params
        if(id == 'last'){
            const todo = await pool.query('SELECT * FROM todo WHERE id=(SELECT max(id) FROM todo)')
            res.json(todo.rows[0])
        }
        else{
            const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id])
            res.json(todo.rows[0])
        }
    } catch (error) {
        console.error(error.message)
    }
})

// update todo title or completed
app.put("/todos/:id", async(req, res) => {
    try {
        console.log(req.body.action)
        if(req.body.action == 'rename'){
            const {id} = req.params
            const title = req.body.title
            await pool.query('UPDATE todo SET title = $1 WHERE id = $2', [title, id])
            res.json("updated")
        }
        if(req.body.action == 'toggle'){
            const {id} = req.params
            const completed = !req.body.completed
            await pool.query('UPDATE todo SET completed = $1 WHERE id = $2', [completed, id])
            res.json("updated")
        }
        if(req.body.action == 'description'){
            const {id} = req.params
            const description = req.body.description
            await pool.query('UPDATE todo SET description = $1 WHERE id = $2', [description.toString(), id])
            res.json("updated")
        }
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

app.listen(PORT, () => {
    console.log(`server started on ${PORT} port`)
})

