import React from "react"
import './modal.css'
import Context from "../context"

export default class Modal extends React.Component {

    static contextType = Context

    render() {
        return(
            <React.Fragment>
                {this.context[2].isOpen &&
                <div className="modal">
                    <div className="modal-body">
                        <div className="mod_el">
                            <div className="modal_header">
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <h1 className="rename">{(this.context[4].todo_title).toString()}</h1>
                                    <button className="add-desc"><nobr>Add info</nobr></button>
                                </div>
                                <button className="savemod" onClick={it}>&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
        )
    }
}