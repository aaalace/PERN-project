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
                                <h1 className="rename">{(this.context[4].todo_title).toString()}</h1>
                                <button className="savemod" onClick={this.context[3].getEdit}>&times;</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </React.Fragment>
        )
    }
}