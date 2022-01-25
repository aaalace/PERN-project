import React, {useState, useEffect} from "react"
import {useMediaQuery} from 'react-responsive'
import {useSelector, useDispatch} from "react-redux"
import {createStore} from 'redux'

const reducer = (state = [], action) => {
    switch (action.type){
        case "ALL TODOS":
          function loadDataOnlyOnce(){
            fetch("http://localhost:5000/todos")
            .then((response) => response.json())
            .then((all) => {
              console.log(all)
            });
          }
          let a = loadDataOnlyOnce()
          console.log(a)

        case "ADD TODO":
            return (
            state.concat({
                id: action.payload.id,
                title: action.payload.title,
                pages: action.payload.pages,
                completed: false,
                ren: false
              })
            )
            
        case "DELETE ALL TODOS":
            async function delTodos() {
                let response = await fetch("http://localhost:5000/todos", {
                    "method": "DELETE"
                    })
                response = await response.json()
              }
            delTodos()
            return ([])
        
        case "DELETE TODO":
            async function delTodo() {
                let response = await fetch(`http://localhost:5000/todos/${action.payload.id.toString()}`, {
                  "method": "DELETE"
                })
                response = await response.json()
              }
            delTodo()
            return (
                state.filter(todo => todo.id !== action.payload.id)
            )

        case "TOGGLE TODO":
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: todo.title, pages: todo.pages, completed: !todo.completed, ren: todo.ren} : todo)))
            
        case "RENAME TODO":
          async function renameTodo() {
              let response = await fetch(`http://localhost:5000/todos/${action.payload.id.toString()}`, {
                  "method": "PUT",
                  "headers": {"Content-Type": "application/json"},
                  "body": JSON.stringify({title: action.payload.title})
              })
              response = await response.json()
            }
          renameTodo()
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: action.payload.title, pages: todo.pages, completed: todo.completed, ren: todo.ren} : todo)))
        
        case "IS ON RENAME TODO":
          return (state.map((todo => todo.id === action.payload.id ? 
            {id: todo.id, title: todo.title, pages: todo.pages, completed: todo.completed, ren: !todo.ren} : todo)))
        
        default:
            return state
    }
}

const store = createStore(reducer)

export default store
