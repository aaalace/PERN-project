import React from "react"
import TodoItem from "./TodoItem"
import propTypes from "prop-types"

function TodoList(props) {
    let cls = 'ul-l'
    if(props.media === 'small'){
        cls = 'ul-s'
    }
    return (
        <ul className={cls}>
            {props.todos.map((todo) => {
                if(props.page === todo.page){
                    return <TodoItem 
                    todo={todo} 
                    key={todo.id} 
                    onChange={props.onToggle}
                    media={props.media}>
                    </TodoItem>
                }
                return null})
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos: propTypes.arrayOf(propTypes.object).isRequired,
    onToggle: propTypes.func.isRequired,
    page: propTypes.number.isRequired,
    media: propTypes.string.isRequired
}

export default TodoList