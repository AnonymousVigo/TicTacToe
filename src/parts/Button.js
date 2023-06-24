import React from 'react'

function Button({index, onClick, position, isBool}) {
    return <button className={`tabs ${isBool[index] && 'active'}`} onClick={() => onClick(index)}>{!index ? "CLEAR" : `#${index} Move (${position})`}</button>
}

export default Button
