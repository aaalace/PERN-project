import React, {useEffect, useState} from "react"
import TodoItem from "./TodoItem"
import propTypes from "prop-types"
import {useSelector, useDispatch} from 'react-redux'
import Axios from 'axios';

function TodoList(props){
    let cls = 'ul-l'    
    if(props.media === 'small'){
        cls = 'ul-s'
    }

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Axios.get('/todos').then((response) => {

            const ordered = response.data
            function compare(a, b) {
                if (a.id < b.id){
                  return -1
                }
                if (a.id > b.id){
                  return 1
                }
                return 0
              }
            ordered.sort(compare)

            for(let todo in ordered){
                dispatch({type: "ADD TODO", payload: ordered[todo]})
            }

            function sleep(milliseconds) {
                const date = Date.now()
                let currentDate = null
                do {
                  currentDate = Date.now()
                } while (currentDate - date < milliseconds)
              }
            // sleep(3000)
            setIsLoading(false)
        })
    }
    , [])

    const todos = useSelector(state => state.todos)

    if(isLoading){
        return (<img className="loading" src={require('../images/loading.gif')} alt="loading..." />)
    }
    else{
        if(todos.length === 0){
            return (<h1 className="empty">Empty list</h1>)
        }
        if(todos.length > 0){
            try {
                return (
                    <ul className={cls}>
                        {todos.map((todo) => {
                            if(props.pages === todo.pages){
                                return <TodoItem 
                                todo={todo} 
                                key={todo.id} 
                                pages={props.pages}
                                media={props.media}>
                                </TodoItem>
                            }
                        })
                        }
                    </ul>
                )
            } 
            catch (error) {
                return null
            }
        }
    }
}

TodoList.propTypes = {
    pages: propTypes.number.isRequired,
    media: propTypes.string.isRequired
}

export default TodoList