import React from "react"

const BtnTimeperiod = ({ onClickHandler, txt }) => {
    return (
        <div>
            <button onClick={onClickHandler}>{txt}</button>
        </div>
    )
}

export default BtnTimeperiod