import React, {useContext} from "react"
import {Context} from "./../../UseReducer"

const YearCell = ({x}) => {
    const [state,dispatch] = useContext(Context)

    return (
        <div className="Year" onClick={() => dispatch({type : "SELECTYEAR", YearID : Number(x)})}>
            {x}
        </div>
    )
}

const YearRow = ({a}) => {
    return(
        <div className="YearRow">
        {
            a.map(x => {
                return (
                    <YearCell x={x} key={x}/>
                )
            })
        }
        </div>
    )
}

const GenerateYears = () => {

    const [state,dispatch] = useContext(Context)

    let sy = []
    let st = state.Calendar.YearPart[0]
    while(st < state.Calendar.YearPart[1]){
        let sn = [];
        for(let i = 0; i < 4 ; i++){
            sn.push(st)
            st++;
        }
        sy.push(sn)
    }


    return(
        <div className="YearsList">
        {
            sy.map((a,b) => {
                return (
                    <YearRow key={`Year-row-${b}`} a={a} />
                )
            })
        }
        </div>
    )

}

export default GenerateYears