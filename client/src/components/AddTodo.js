import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"

function AddTodo(props) {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [title, setValue] = useState('')
    const [disable, setDisable] = useState(true)
    if(todos.length > 0 & disable){
        setDisable(false)
    }
    if(todos.length === 0 & !disable){
        setDisable(true)
    }

    let clear_color = 'rgb(125, 67, 141)'
    if(disable){
        clear_color = 'rgba(183, 139, 196, 0.678)'
    }

    const style = {
        input: {
            borderColor: 'rgb(255, 67, 141)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '5px',
            marginRight: '1rem',
            marginLeft: '1rem',
            color: 'rgb(125, 67, 141)',
            width: '35%',
            height: '2rem',
            fontSize: '15px'
        },
        button: {
            backgroundColor: 'rgb(125, 67, 141)',
            color: 'rgb(255, 255, 255)',
            width: '80px',
            height: '30px',
            marginTop: '.3rem',
            borderRadius: '5px',
            border: 0
        },
        clearButton: {
            backgroundColor: clear_color,
            color: 'rgb(255, 255, 255)',
            width: '80px',
            height: '30px',
            marginTop: '.3rem',
            borderRadius: '5px',
            border: 0
        }
    }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            if (title.trim()) {
                const body = {title, pages: props.pages, completed: false, ren: false, description: ''}
                await fetch("/todos", {
                            "method": "POST",
                            "headers": {"Content-Type": "application/json"},
                            "body": JSON.stringify(body)
                            })
                setValue('')
                get_last_posted_id_and_send()
            }
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const get_last_posted_id_and_send = async e => {
        try {
            let response = await fetch("/todos/last", {
                            "method": "GET"
                            })
            let create = await response.json()
            dispatch({type: "ADD TODO", payload: create})
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const resetHandler = async e => {
        e.preventDefault()
        try {
            if(window.confirm('Are you sure you want to delete all items?')){
                dispatch({type: "DELETE ALL TODOS", payload: ''})
                setValue('')
            }
        }
        catch (error) {
            console.error(error.message)
        }
    }

    return (
        <form style={{display: 'flex', justifyContent: 'center', marginTop: '3vh'}} onSubmit={submitHandler} onReset={resetHandler} autoComplete="off">
            <button style={style.clearButton} type="reset" disabled={disable}>Delete all</button>
            <input id="inp" style={style.input} value={title} onChange={event => setValue(event.target.value)} maxLength="20"></input>
            <button style={style.button} type="submit">Add item</button>
        </form>
    )
}

export default AddTodo