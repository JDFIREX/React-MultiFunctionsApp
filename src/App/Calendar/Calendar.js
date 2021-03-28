import React, {useContext} from "react"
import {Context} from "./../../UseReducer"
import leftClick from "./../../images/leftClick.svg"
import rightClick from "./../../images/rightClick.svg"
import leftDoubleClick from "./../../images/leftDoubleClick.svg"
import rightDoubleClick from "./../../images/rightDoubleClick.svg"
import "./Calendar.css"
import GenerateCal from "./GenerateCal"
import GenerateMonths from "./GenerateMonths"
import GenerateYears from "./GenerateYears"
import {SelectedDay,AddNewEvent} from "./SelectedDay"

const Btns = ({show,inner,dispatch}) => {
        if(show === "days"){
            return (
                <div className="Btns" >
                    <div  className="btn" onClick={() => dispatch({type: "YEAR DEC"})}>
                        <img src={leftDoubleClick}  alt="Year dec"/>
                    </div>
                    <div className="btn" onClick={() => dispatch({type: "MONTH DEC"})}>
                        <img src={leftClick}  alt="Month dec"/>
                    </div>
                    <div className="btn_inner" onClick={() => dispatch({type: "CHANGE SHOW"})} >
                        <p>{inner}</p>
                    </div>
                    <div className="btn" onClick={() => dispatch({type: "MONTH INC"})}>
                        <img src={rightClick} alt="Month Inc"  />
                    </div>
                    <div className="btn" onClick={() => dispatch({type: "YEAR INC"})}>
                        <img src={rightDoubleClick}  alt="Year Inc" />
                    </div>
                </div>
            )
        }else if (show === "months") {
            return (
                <div className="Btns" >
                    <div  className="btn_month" onClick={() => dispatch({type: "ONLYYEAR DEC"})}>
                        <img src={leftDoubleClick}  alt="Year dec"/>
                    </div>
                    <div className="btn_inner_month" onClick={() => dispatch({type: "CHANGE SHOW"})} >
                        <p>{inner}</p>
                    </div>
                    <div className="btn_month" onClick={() => dispatch({type: "ONLYYEAR INC"})}>
                        <img src={rightDoubleClick}  alt="Year Inc" />
                    </div>
                </div>
            )
        }
        else if (show === "years") {
            return (
                <div className="Btns" >
                    <div  className="btn_year" onClick={() => dispatch({type: "YEARPART DEC"})}>
                        <img src={leftDoubleClick}  alt="Year dec"/>
                    </div>
                    <div className="btn_inner_year" >
                        <p>{inner}</p>
                    </div>
                    <div className="btn_year" onClick={() => dispatch({type: "YEARPART INC"})}>
                        <img src={rightDoubleClick}  alt="Year Inc" />
                    </div>
                </div>
            )
        }
}

const Days = () => {
    return (
        <div className="days">
            <p>Mon</p>
            <p>Thue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>
            <p>Sun</p>
        </div>
    )
}

const Calendar = () => {

    const [state,dispatch] = useContext(Context)
    const Calendar = state.Calendar;

    return (
        <>
        <SelectedDay />

        {
            state.Calendar.addEvent ? (
                <AddNewEvent />
            ) : (
                <div className="Calendar">
                    <Btns show={Calendar.show} inner={Calendar.inner} dispatch={dispatch} />
                    {Calendar.show === "days" && <Days /> }
                    {
                        Calendar.show === "days" ? (
                            <GenerateCal />
                        ) : 
                        Calendar.show === "months" ? (
                            <GenerateMonths />
                        ) :
                        Calendar.show === "years" && (
                            <GenerateYears />
                        )
                    }
                </div>
            )
        }

        

        </>
    )

}


export default Calendar