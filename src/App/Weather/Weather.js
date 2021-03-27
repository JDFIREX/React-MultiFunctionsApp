import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const Weather = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="Weather">
            Weather
        </div>
    )

}


export default Weather