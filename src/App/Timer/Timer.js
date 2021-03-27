import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const Timer = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Timer">
            Timer
        </div>
    )

}


export default Timer