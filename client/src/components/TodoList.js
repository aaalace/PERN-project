import React from "react"
import TodoItem from "./TodoItem"
import propTypes from "prop-types"
import {useSelector} from 'react-redux'

function TodoList(props){
    let cls = 'ul-l'
    if(props.media === 'small'){
        cls = 'ul-s'
    }
    
    const todos = useSelector(state => state)

    try {
        return (
            <ul className={cls}>
                {todos.map((todo) => {
                    return <TodoItem 
                    todo={todo} 
                    key={todo.id} 
                    pages={props.pages}
                    media={props.media}>
                    </TodoItem>})
                }
            </ul>
        )
    } catch (error) {
        return null
    }
}

TodoList.propTypes = {
    pages: propTypes.number.isRequired,
    media: propTypes.string.isRequired
}

export default TodoList