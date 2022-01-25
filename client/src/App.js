import React, {useState, useEffect} from "react"
import {useMediaQuery} from 'react-responsive'
import {useSelector, useDispatch} from "react-redux"
import TodoList from "./components/TodoList"
import Context from "./context"
import AddTodo from "./components/AddTodo"
import SwitchPage from "./components/Switcher"
import Modal from "./modal/Modal"

function App() {
  const todos = useSelector(state => state)
  function GetAll(){const dispatch = useDispatch()
    useEffect(() => {
    dispatch({type: "ALL TODOS", payload: ''})
  }, [])}
  GetAll()

  let [isOpen, setOpen] = useState(false)
  let [todo_title, setTitle] = useState(false)
  let [page_cur, setPage] = useState(1)
  
  let wrap_cl = "wrapper-l"
  let list_med = 'large' 
  if (useMediaQuery({ query: '(max-width: 950px)' })){
            wrap_cl = "wrapper-s"
            list_med = "small"
  }
  if (todos.length > 24){wrap_cl = "wrapper-3"}

  function getEdit(text){
    setOpen(false)
  }

  function switchPage(value){
    setPage(value)
  }

  console.log('APP', todos)
  return (
    <Context.Provider value={[{isOpen}, {getEdit}, {todo_title}]}>
        <div className={wrap_cl}>
          <div className="head">
            <h1>Item List</h1>
            <SwitchPage onMove={switchPage}></SwitchPage>
          </div>
          <AddTodo></AddTodo>
          <TodoList pages={Number(page_cur)} media={list_med}></TodoList>
          <Modal></Modal>
        </div>
    </Context.Provider>
  );
}

export default App;
