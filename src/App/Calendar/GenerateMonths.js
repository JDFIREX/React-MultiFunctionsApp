import React, {useContext} from "react"
import {Context,GetMonthName} from "./../../UseReducer"

const MonthCell = ({x,dispatch}) => {
    return (
        <div className="Month" onClick={() => dispatch({type : "SELECTMONTH", monthid : x.monthId})} >
            {x.month}
        </div>
    )
}

const MonthRow = ({a,dispatch}) => {
    return (
        <div className="Month_row" >
            {
                a.map(x => {
                    return (
                        <MonthCell  key={`${x.year}-${x.month}`} x={x} dispatch={dispatch} />
                    )
                })
            }
        </div>
    )

}

const GenerateMonths = () => {
    const [state,dispatch] = useContext(Context)

    let months = [];
    let c = 1;
    while(c <= 12){
        let m = [];
        for(let j = 0; j < 4; j++){
            m.push({
                monthId : c - 1,
                month : GetMonthName(c),
                year : state.Calendar.Year
            })
            c++;
        }
        months.push(m)
    }

    return (
        <div className="MonthsList">
        {
            months.map((a,b) => {
                return(
                    <MonthRow key={`${state.Calendar.Year}-Months-${b}`} a={a} dispatch={dispatch} />
                )
            })
        }
        </div>
    )


}

export default GenerateMonths