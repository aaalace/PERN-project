import React, {useContext} from "react"
import propTypes from "prop-types"
import Context from "../context"


function TodoItem({todo, onChange, media}) {
    const {removeTodo} = useContext(Context)[0]
    const {editTodo} = useContext(Context)[1]
    const classes = []
    const span_cls = []

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
    return (
        <li className={classes.join(' ')}>
            <span className={span_cls.join(' ')}>
                <input type="checkbox" checked={todo.completed} className="name_input" onChange={() => onChange(todo.id)}></input>
                &nbsp;
                <i>{todo.title}</i>
            </span>
            <div className="btns_item">
                <button className="pen" data-tooltip="Редактировать"></button>
                <button className="show_info" onClick={() => editTodo(todo.id, todo.title)} data-tooltip="Подробнее"></button> 
                <button className="rm" onClick={() => removeTodo(todo.id)} data-tooltip="Удалить"></button>
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