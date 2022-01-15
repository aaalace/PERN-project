import React, {useContext, useState} from "react"
import propTypes from "prop-types"
import Context from "../context"


function TodoItem({todo, onChange, media}) {
    const {removeTodo} = useContext(Context)[0]
    const {editTodo} = useContext(Context)[1]
    const [value, setValue] = useState('')
    const classes = []
    const span_cls = []
    let tooltips = ['Cancel', 'Redact', 'Read more', 'Delete']
    if (media === 'small'){tooltips = [null, null, null, null]}

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

    function checkClick(arg){
        if (todo.ren && arg){
            todo.title = value
        }
        if (todo.title.trim()) {
            editTodo(todo.id, todo.title, 'ren')
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          checkClick(true)
        }
      }
    let ren_cl = 'pen'
    if (todo.ren){
        ren_cl = 'pen-check'
        tooltips[1] = 'Ok'
        if (media === 'small'){tooltips[1] = null}
    }
    return (
        <li className={classes.join(' ')}>
            <span className={span_cls.join(' ')}>
                <input type="checkbox" checked={todo.completed} className="name_input" onChange={() => onChange(todo.id)}></input>
                &nbsp;
                {todo.ren ? <input maxLength="20" className="ren_input" value={value} onChange={event => setValue(event.target.value)} onKeyDown={handleKeyDown}></input>
                : <i>{todo.title}</i>}
            </span>
            <div className="btns_item">
                {todo.ren ? <button className="cancel" onClick={() => checkClick(false)} data-tooltip={tooltips[0]}></button> : null}
                <button className={ren_cl} onClick={() => checkClick(true)} data-tooltip={tooltips[1]}></button>
                <button className="show_info" onClick={() => editTodo(todo.id, todo.title, '')} data-tooltip={tooltips[2]}></button> 
                <button className="rm" onClick={() => removeTodo(todo.id)} data-tooltip={tooltips[3]}></button>
            </div>
        </li>
    )
}


// модальное окно с редактированием информации

TodoItem.propTypes = {
    todo: propTypes.object.isRequired,
    onChange: propTypes.func.isRequired,
}

export default TodoItem