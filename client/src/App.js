import React, {useState} from "react"
import {useMediaQuery} from 'react-responsive'
import {useSelector} from "react-redux"
import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"
import SwitchPage from "./components/Switcher"
import Modal from "./modal/Modal"

function App() {

  const todos = useSelector(state => state.todos)

  let [page_cur, setPage] = useState(1)
  
  let list_med = 'large' 
  if (useMediaQuery({ query: '(max-width: 950px)' })){
      list_med = "small"
  }

  function switchPage(value){
    setPage(value)
  }

  console.log('APP', todos)
  return (
      <div className="wrapper">
        <div className="head">
          <h1>Item List</h1>
          <SwitchPage onMove={switchPage}></SwitchPage>
        </div>
        <div className="work-bar">
          <AddTodo pages={Number(page_cur)}></AddTodo>
          <TodoList pages={Number(page_cur)} media={list_med}></TodoList>
          <Modal></Modal>
        </div>
      </div>
  );
}

export default App;
