import React, {useState} from "react"
import propTypes from "prop-types"

const but_styles = {
    1: {
        width: '2.5rem',
        height: '3rem',
        borderRadius: '20px 0 0 20px',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 0.3)',
        transition: '.5s',
        color: 'white'
    },
    2: {
        width: '2.5rem',
        height: '3rem',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 0.3)',
        transition: '.5s',
        color: 'white'
      },
    3: {
        width: '2.5rem',
        height: '3rem',
        borderRadius: '0 20px 20px 0',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 0.3)',
        transition: '.5s',
        color: 'white'
      },
    4: {
        width: '2.5rem',
        height: '3rem',
        borderRadius: '20px 0 0 20px',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 1)',
        transition: '.5s',
        color: 'white'
    },
    5: {
        width: '2.5rem',
        height: '3rem',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 1)',
        transition: '.5s',
        color: 'white'
      },
    6: {
        width: '2.5rem',
        height: '3rem',
        borderRadius: '0 20px 20px 0',
        border: '0',
        backgroundColor: 'rgba(125, 67, 141, 1)',
        transition: '.5s',
        color: 'white'
      }
}

function SwitchPage({onMove}){
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()
        onMove(value)
    }

    let values = [false, false, false]
    value ? values[value - 1] = true : values[0] = true

    return (
        <form className="switcher" onSubmit={submitHandler}>
            <button type="submit" value={1} style={values[0] ? but_styles[4] : but_styles[1]} onClick={event => setValue(event.target.value)}>1</button>
            <button type="submit" value={2} style={values[1] ? but_styles[5] : but_styles[2]} onClick={event => setValue(event.target.value)}>2</button>
            <button type="submit" value={3} style={values[2] ? but_styles[6] : but_styles[3]} onClick={event => setValue(event.target.value)}>3</button>
        </form>
    )
}

SwitchPage.propTypes = {
    onMove: propTypes.func.isRequired
}

export default SwitchPage