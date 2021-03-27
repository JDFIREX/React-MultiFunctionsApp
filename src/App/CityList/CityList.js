import React, {useContext} from "react"
import {Context} from "./../../UseReducer"


const CityList = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="CityList">
            CityList
        </div>
    )

}


export default CityList