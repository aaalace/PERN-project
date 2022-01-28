import React from "react"


function Footer({todo, media}) {
    return (
        <div className="footer-container">
            <ul className="footer-list">
                <li className="footer-item"><a className="footer-text" href="https://vk.com/aaalace">VK</a></li>
                <li className="footer-item"><a className="footer-text" href="mailto:tyj5resd@gmail.com">Email</a></li>
                <li className="footer-item"><a className="footer-text" href="https://github.com/aaalace">Github</a></li>
            </ul>
        </div>
    )
}


export default Footer
