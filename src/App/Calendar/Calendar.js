import React, {useContext} from "react"
import {Context} from "./../../UseReducer"
import leftClick from "./../../images"
import rightClick from "./../../images"
import leftDoubleClick from "./../../images"
import rightDoubleClick from "./../../images"

const Btns = ({show,inner,dispatch}) => {
        if(show === "days"){
            return (
                <div className="Btns_days" >
                    <div  className="btn" onClick={() => dispatch({type: "YEAR DEC"})}>
                        <img src={leftDoubleClick}  alt="Year dec"/>
                    </div>
                    <div className="btn">
                        <img src={leftClick}  alt="Month dec" onClick={() => dispatch({type: "MONTH DEC"})}/>
                    </div>
                    <div className="btn_inner" onClick={() => dispatch({type: "CHANGE SHOW"})}>
                        <p>{inner}</p>
                    </div>
                    <div className="btn">
                        <img src={rightClick} alt="Month Inc" onClick={() => dispatch({type: "MONTH INC"})}/>
                    </div>
                    <div className="btn">
                        <img src={rightDoubleClick}  alt="Year Inc" onClick={() => dispatch({type: "YEAR INC"})}/>
                    </div>
                </div>
            )
        }
}








const Calendar = () => {

    const [state,dispatch] = useContext(Context)
    const Calendar = state.Calendar;

    return (
        <div className="Calendar">
            <Btns show={Calendar.show} inner={Calendar.inner} dispatch={dispatch/>
            {Calendar.show === "days" && <Days /> }
            <GenerateCal />
        </div>
    )

}


export default Calendar