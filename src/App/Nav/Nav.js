import React, {useContext, useRef, useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {Context} from "./../../UseReducer"
import "./Nav.css"
import {Logos} from "./../../UseReducer"

const NavItem = ({state,a, setName,setHover,setItemCoords}) => {

    const ItemRef = useRef(null)
    // console.log(state)

    const ShowItemName = (e) =>{
        setHover(true)
        setItemCoords(ItemRef.current.getBoundingClientRect())
        setName(a)
    }

    const HideItemName = () => {
        setHover(false)
        setItemCoords(0)
        setName("")
    }

    return (
        <Link to={`/${a}`}>
            <div className="nav_item" ref={ItemRef} onMouseEnter={ShowItemName} onMouseLeave={HideItemName}>
                <img src={Logos[state.logo]} alt={`logo ${a}`} />
            </div>
        </Link>
    )
}


const Nav = () => {

    const [state,dispatch] = useContext(Context)
    const [ItemCoords, setItemCoords] = useState(0)
    const [hover,setHover] = useState(false)
    const [name, setName] = useState("")
    const ShowNameRef = useRef(null)

    useEffect(() => {
        SetPositionName(hover,ItemCoords)
    },[name, setName])

    const SetPositionName = (t,coords) => {
        if(t){
            let myCoords = document.querySelector(".showName").getBoundingClientRect()
            let bottom = coords.bottom;
            let left = coords.left;
            let width = coords.width;
            let myWidth = myCoords.width;
            ShowNameRef.current.style.top = `${bottom + 25}px`
            ShowNameRef.current.style.left = `${left - myWidth + width - 5 + window.scrollX}px`
        }else{
            ShowNameRef.current.style.top = `0px`
            ShowNameRef.current.style.left = `-100%`;
        }
    }

    return (
        <div className="nav">
            <Link to="/" >
                <h1>Multi Functions App</h1>
            </Link>
            <div className="nav_list">
                {
                    Object.keys(state).map((a,b) => {
                        return <NavItem state={state[`${a}`]} a={a} key={b} setHover={setHover} setItemCoords={setItemCoords} setName={setName} />
                    })
                }
            </div>
            <div ref={ShowNameRef} className="showName">{name}</div>
        </div>
    )
}


export default Nav