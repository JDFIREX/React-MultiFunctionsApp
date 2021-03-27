import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const Todo= () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Todo">
            Todo
        </div>
    )

}


export default Todo