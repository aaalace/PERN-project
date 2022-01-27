import React from "react"
import './modal.css'
import {useDispatch, useSelector} from "react-redux"

function Modal(){
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch({type: "CLOSE MODAL"})
    }

    const addInfo = () => {
        dispatch({type: "ADD DESCRIPTION", payload: {id: modal.id, description: '123456789'}})
        dispatch({type: "ADD INFO", payload: {description: '123456789'}})
    }

    if(modal.open){ 
    return(
        <div className="modal">
            <div className="modal-body">
                <div className="mod_el">
                    <div className="modal_header">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h1 className="rename">{(modal.name).toString()}</h1>
                            <button className="add-desc" onClick={addInfo}><nobr>Add info</nobr></button>
                        </div>
                        <button className="savemod" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal_body">
                        <div className="modal_info">
                            {modal.description.length > 0 ? 
                                <p className="modal_info_p">
                                    {modal.description.toString()}
                                </p>
                            : null}
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