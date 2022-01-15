import React from "react"
import TodoList from "./Todo/TodoList"
import Context from "./context"
import AddTodo from "./AddTodo"
import SwitchPage from "./Switcher"
import Modal from "./modal/Modal"
import {useMediaQuery} from 'react-responsive';

function App() {
  let [todos, setTodos] = React.useState([])
  let [isOpen, setOpen] = React.useState(false)
  let [todo_title, setId] = React.useState(false)
  let [page, setPage] = React.useState(1)

  const small = useMediaQuery({ query: '(max-width: 950px)' })
  const large = useMediaQuery({ query: '(min-width: 950px)' })

  function toggleTodo(id) {
    setTodos( 
      todos.map(todo => {
      if (todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  function removeTodo(id){
    let pg = todos.filter(todo => todo.id === id)[0]
    pg = Number(pg.page)
    setTodos(todos.filter(todo => todo.id !== id))
    if (pg === 1 && todos.length > 8){todos[8].page = 1}
    if (pg === 2 && todos.length > 16){todos[16].page = 2}
    if (pg === 3 && todos.length > 24){todos[24].page = 3}
  }

  function editTodo(id, title){
    setOpen(true)
    setId(title)
  }

  function getEdit(text){
    setOpen(false)
  }

  function addTodo(title){
    let a = todos.length ? todos[todos.length - 1].id + 1 : 0
    let p = Math.floor(todos.length / 8) + 1
    setTodos(todos.concat({
      title,
      id: a,
      completed: false,
      page: p
    }))
  }

  function switchPage(value){
    setPage(value)
  }

  let wrap_cl = "wrapper-l"
  if (small){let wrap_cl = "wrapper-s"}
  return (
    <Context.Provider value={[{removeTodo}, {editTodo}, {isOpen}, {getEdit}, {todo_title}]}>
      <div className={wrap_cl}>
        <div className="head">
          <h1>Item List</h1>
          <SwitchPage onMove={switchPage}></SwitchPage>
        </div>
        <AddTodo onCreate={addTodo}></AddTodo>
        {small && <TodoList todos={todos} onToggle={toggleTodo} page={Number(page)} media="small"></TodoList>}
        {large && <TodoList todos={todos} onToggle={toggleTodo} page={Number(page)} media="large"></TodoList>}
        <Modal></Modal>
      </div>
    </Context.Provider>
  );
}

export default App;
