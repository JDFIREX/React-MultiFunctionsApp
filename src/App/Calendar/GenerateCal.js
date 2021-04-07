import React, {useContext} from "react"
import {Context} from "./../../UseReducer"

const NotThisMonth =({x,d,f}) => {

    const [state,dispatch] = useContext(Context)

    return (
        <div 
            className="day not_this_month" 
            onClick={() => dispatch({type : "SELECTMONTHDAY", f, d})}
        >
            {x.day}
            {
                state.Calendar.DayEvents[d] && (
                    <p>{state.Calendar.DayEvents[d].length}</p>
                )
            }
            
    </div>
    )
}

const Day = ({x,d,s,c}) => {

    const [state,dispatch] = useContext(Context)
    let ss;
    if(state.Calendar.selectDay === d){
        ss = "selected"
    }

    return(
        <div 
            className={`day  ${c} ${ss}`} 
            onClick={(e) => dispatch({type : "SELECTDAY", day : d})}
        >
                {x.day}
                {
                    state.Calendar.DayEvents[d] && (
                        <>
                            {
                                state.Calendar.DayEvents[d].length > 0 && (
                                    <div className="inner">
                                        <p>{state.Calendar.DayEvents[d].length}</p>
                                    </div>
                                )

                            }
                        </>
                    )
                }
        </div>
    )
}

const GenerateCal = () => {

    const [state] = useContext(Context)

    let days = [];
    let l = 0;
    let back = state.Calendar.back;
    if(back === 2) back = 2 - 7;
    while(l < 42){
        let ld =[]
        for(let i = 0 ; i <= 6; i++){
            let d = new Date(state.Calendar.Year,state.Calendar.Month,back)
            ld.push({
                day : d.getDate(),
                month : d.getMonth() + 1,
                Year : d.getFullYear()
            })
            back++;
            l++
        }
        days.push(ld)
    }


    return (
        <div className="cal">
            {
                days.map((a,b) => {
                    let f = b < 3 ? "dec" : "inc";
                    
                    return(
                        <div className="cal_row" key={`${state.Calendar.Year}-${state.Calendar.Month}-Week-${b + 1}`}>
                            {
                                a.map(x => { 
                                    let d = `${x.Year}-${x.month}-${x.day}`;

                                    if(x.month !== state.Calendar.Month + 1){
                                        return <NotThisMonth x={x} d={d} key={d} f={f} />
                                    }
                                    
                                    if(state.Calendar.currentDay === d) {
                                        return <Day x={x} d={d} key={d} c={"currentDay"} />
                                    }

                                    return <Day x={x} d={d} key={d} />

                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GenerateCal