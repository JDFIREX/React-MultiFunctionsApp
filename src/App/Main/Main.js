import React, {useContext} from "react"
import {Link} from "react-router-dom"
import {Context} from "./../../UseReducer"
import {Logos} from "./../../UseReducer"
import "./Main.css"

const MainItem = ({state,a}) => {


    return (
        <Link to={`/${a}`}>
            <div className="main_item">
                <img src={Logos[state.logo]} alt={`logo ${a}`} />
                <p>{a}</p>
            </div>
        </Link>
    )
}

const Main = () => {

    const [state,dispatch] = useContext(Context)

    return (
        <div className="main">
            {
                Object.keys(state).map((a,b) => {
                    return <MainItem state={state[`${a}`]} a={a} key={b} />
                })
            }
        </div>
    )
}


export default Main