import React, {useState} from "react"

function AddTodo({onCreate}) {
    const [value, setValue] = useState('')
    
    const style = {
        input: {
            borderColor: 'rgb(255, 67, 141)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '5px',
            marginRight: '1rem',
            color: 'rgb(125, 67, 141)',
            width: '35%',
            height: '2rem',
        },
        button: {
            backgroundColor: 'rgb(125, 67, 141)',
            color: 'white',
            width: '100px',
            height: '30px',
            marginTop: '.2rem'
        }
    }

    function submitHandler(event) {
        event.preventDefault()
        setValue('')
        if (value.trim()) {
            onCreate(value)
        }
    }

    return (
        <form style={{display: 'flex', justifyContent: 'center'}} onSubmit={submitHandler} autocomplete="off">
            <input id="inp" style={style.input} value={value} onChange={event => setValue(event.target.value)} maxLength="14"></input>
            <button style={style.button} type="submit">Add item</button>
        </form>
    )
}

export default AddTodo