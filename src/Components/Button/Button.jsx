import React from "react";
import './Button.css'

function Button(props) {
    return (
        <button
            className={`btn ${
            (props.type === 'add' && 'add') || 
            (props.type === 'remove' && 'remove') || 
            (props.type === 'checkout' && 'checkout')
        }`}
        disabled={props.disable}
        onClick={props.onClick}
        id={props.id}>
            {props.title}
        </button>
    )
}

export default Button