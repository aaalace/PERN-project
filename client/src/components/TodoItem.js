import React, {useState} from "react"
import { useDispatch } from "react-redux"


function TodoItem({todo, media}) {
    const dispatch = useDispatch()

    const [value, setValue] = useState('')

    const classes = []
    const span_cls = []

    let tooltips = ['Cancel', 'Redact', 'Read more', 'Delete', 'Ok']
    if (media === 'small'){tooltips = [null, null, null, null, null]}

    if (todo.completed){
        if (media === 'small'){
            classes.push('done-s')
            span_cls.push('span-s')
        }
        if (media === 'large'){
            classes.push('done-l')
            span_cls.push('span-l')
        } 
    }
    else{
        if (media === 'small'){
            classes.push('not-done-s')
            span_cls.push('span-s')
        }
        if (media === 'large'){
            classes.push('not-done-l')
            span_cls.push('span-l')
        } 
    }

    const toggleTodo = (id, completed) => {
        dispatch({type: "TOGGLE TODO", payload: {id, completed}})
    }

    const removeTodo = (id) => {
        dispatch({type: "DELETE TODO", payload: {id}})
        }

    const editTodo = (id, title) => {
        dispatch({type: "RENAME TODO", payload: {id, title}})
        }

    const checkClick = (id, arg) => {
        if(arg === 'mid'){
            dispatch({type: "IS ON RENAME TODO", payload: {id}})
        }
        else{
            if(arg){
                dispatch({type: "IS ON RENAME TODO", payload: {id}})
                todo.title = value
            }
            else{
                dispatch({type: "IS ON RENAME TODO", payload: {id}})
            }
            if(todo.title.trim()) {
                editTodo(todo.id, todo.title)
            }
    }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            checkClick(todo.id, true)
        }
        }

    const openModal = (id, title, description) => {
        dispatch({type: "OPEN MODAL", payload: {id, title, description}})
    }
    
    return (
        <li className={classes.join(' ')}>
            <span className={span_cls.join(' ')}>
                <input type="checkbox" checked={todo.completed} className="name_input" onChange={() => toggleTodo(todo.id, todo.completed)}></input>
                {todo.ren ? <input maxLength="20" className="ren_input" value={value} onChange={event => setValue(event.target.value)} onKeyDown={handleKeyDown}></input>
                : <i>{todo.title}</i>}
            </span>
            <div className="btns_item">
                {todo.ren ? <button className="cancel" onClick={() => checkClick(todo.id, false)} data-tooltip={tooltips[0]}></button> : null}

                {todo.ren ? <button className="pen-check" onClick={() => checkClick(todo.id, true)} data-tooltip={tooltips[4]}></button> : 
                <button className="pen" onClick={() => checkClick(todo.id, 'mid')} data-tooltip={tooltips[1]}></button>}

                <button className="show_info" onClick={() => openModal(todo.id, todo.title, todo.description)} data-tooltip={tooltips[2]}></button> 

                <button className="rm" onClick={() => removeTodo(todo.id)} data-tooltip={tooltips[3]}></button>
            </div>
        </li>
    )
}


export default TodoItem