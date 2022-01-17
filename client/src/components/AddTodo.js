import React, {useState} from "react"

function AddTodo({onCreate, onClear, todos}) {
    const [id, setID] = useState(1)
    const [title, setValue] = useState('')
    const [pages, setPages] = useState(1)
    const [completed, setCompleted] = useState(false)
    const [ren, setRen] = useState(false)

    let clear_color = 'rgba(183, 139, 196, 0.678)'
    let disable = true
    if(todos.length > 0){clear_color = 'rgb(125, 67, 141)'
                        disable = false}

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
            setID(id => id + 1)
            const body = {id, title, pages, completed, ren}
            await fetch("http://localhost:5000/todos", {
                        "method": "POST",
                        "headers": {"Content-Type": "application/json"},
                        "body": JSON.stringify(body)
                        })
            console.log('added item')
            setValue('')
            onCreate(title)
        }}
        catch (error) {
            console.error(error.message)
        }
    }

    const resetHandler = async e => {
        e.preventDefault()
        try {
            if(window.confirm('Are you sure you want to delete all items?')){
                await fetch("http://localhost:5000/todos", {
                            "method": "DELETE"
                            })
                console.log('delete all items')
                onClear('all')
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