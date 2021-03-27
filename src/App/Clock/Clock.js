import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const Clock = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Clock">
            Clock
        </div>
    )

}


export default Clock