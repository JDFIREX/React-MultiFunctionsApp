import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const Location = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Location">
            Location
        </div>
    )

}


export default Location