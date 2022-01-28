import React, {useState} from "react"
import './modal.css'
import {useDispatch, useSelector} from "react-redux"

function Modal(){
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const [onRename, setRename] = useState(false)
    const [value, setValue] = useState('')
    let bt_name = 'Add info'
    if (modal.description.length > 0){
        bt_name = 'Change info'
    }

    const closeModal = () => {
        dispatch({type: "CLOSE MODAL"})
    }

    const addInfo = () => {
        if(onRename){
            setRename(false)
            if(value.trim()) {
                dispatch({type: "ADD DESCRIPTION", payload: {id: modal.id, description: value}})
                dispatch({type: "ADD INFO", payload: {description: value}})
            }
            setValue('')
        }
        else{
            setRename(true)
        }
    }

    const cancelRename = () => {
        setRename(false)
        setValue('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addInfo()
        }
    }

    function reformat_description(){
        
    }

    if(modal.open){
    const description = reformat_description() 
    return(
        <div className="modal">
            <div className="modal-body">
                <div className="mod_el">
                    <div className="modal_header">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h1 className="rename">{(modal.name).toString()}</h1>
                            <button className="add-desc" onClick={addInfo}><nobr>{onRename ? 'Save info' : bt_name}</nobr></button>
                            &nbsp;
                            {onRename ? <button className="modal_cancel-rename" onClick={cancelRename}>Cancel</button>
                            : null}
                        </div>
                        <button className="savemod" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal_body">
                        <div className="modal_info">
                            {onRename ?
                            <textarea className="modal_input" type="text" rows="15" value={value} onChange={event => setValue(event.target.value)}></textarea>
                            :
                            <>{modal.description.length > 0 ?
                            <div id="carousel">
                                <textarea readonly="true" className="modal_info_p" type="text" rows="15">
                                    {modal.description.toString()}
                                </textarea>
                            </div>
                            : null}</>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    else{
        return null
    }
}

export default Modal