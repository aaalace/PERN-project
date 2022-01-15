import React from "react"
import TodoList from "./components/TodoList"
import Context from "./context"
import AddTodo from "./components/AddTodo"
import SwitchPage from "./components/Switcher"
import Modal from "./modal/Modal"
import {useMediaQuery} from 'react-responsive';

function App() {
  let [todos, setTodos] = React.useState([])
  let [isOpen, setOpen] = React.useState(false)
  let [todo_title, setTitle] = React.useState(false)
  let [page_cur, setPage] = React.useState(1)

  const small = useMediaQuery({ query: '(max-width: 950px)' })

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
    if (id === 'all'){
      setTodos([])
    }
    else{
    let pg = todos.filter(todo => todo.id === id)[0]
    pg = Number(pg.page)
    setTodos(todos.filter(todo => todo.id !== id))
    if (pg === 1 && todos.length > 8){todos[8].page = 1}
    if (pg === 2 && todos.length > 16){todos[16].page = 2}
    if (pg === 3 && todos.length > 24){todos[24].page = 3}
    }
  }

  function editTodo(id, title, arg){
    if(arg === 'ren'){
      setTodos( 
        todos.map(todo => {
        if (todo.id === id){
          todo.ren = !todo.ren
        }
        return todo
      }))
    }
    else{
      setOpen(true)
      setTitle(title)
    }
  }

  function getEdit(text){
    setOpen(false)
  }

  function addTodo(title){
    let a = todos.length ? todos[todos.length - 1].id + 1 : 0
    let p = Math.floor(todos.length / 8) + 1
    if (p > 3){p = 3}
    setTodos(todos.concat({
      id: a,
      title,
      page: p,
      completed: false,
      ren: false
    }))
  }

  function switchPage(value){
    setPage(value)
  }

  let list_med = 'large' 
  let wrap_cl = "wrapper-l"
  if (small){wrap_cl = "wrapper-s"
            list_med = "small"}
  if (todos.length > 24){wrap_cl = "wrapper-3"}
  return (
    <Context.Provider value={[{removeTodo}, {editTodo}, {isOpen}, {getEdit}, {todo_title}]}>
        <div className={wrap_cl}>
          <div className="head">
            <h1>Item List</h1>
            <SwitchPage onMove={switchPage}></SwitchPage>
          </div>
          <AddTodo todos={todos} onCreate={addTodo} onClear={removeTodo}></AddTodo>
          <TodoList todos={todos} onToggle={toggleTodo} page={Number(page_cur)} media={list_med}></TodoList>
          <Modal></Modal>
        </div>
    </Context.Provider>
  );
}

export default App;
