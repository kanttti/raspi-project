import React from "react"

const BtnTimeperiod = ({ onClickHandler, txt }) => {
    return (
        <div className="btn_time_period">
            <button onClick={onClickHandler}>{txt}</button>
        </div>
    )
}

export default BtnTimeperiod