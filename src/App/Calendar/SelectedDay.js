import React,{useContext,useState} from "react"
import {Context} from "./../../UseReducer"
import plus from "./../../images/plus.svg"

export const AddNewEvent = () => {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [todo,setTodo] = useState(false)
    const [state,dispatch] = useContext(Context)
        

    const ResetForm = (e) => {
        e.preventDefault()
    }
    const SubmitForm = (e) => {
        e.preventDefault()
    }


    return (
        <div className="AddNewEvent">
            <h1>Add new Event</h1>
            <h2>To {state.Calendar.selectDay}</h2>
            <form onReset={ResetForm} onSubmit={SubmitForm}>
                <label htmlFor="title" className="title">
                    <p>Event Title</p>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </label>
                <label htmlFor="description" className="description">
                    <p>Event Description</p>
                    <textarea style={{resize: "none"}} type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={description}/>
                </label>
                <label htmlFor="todo" className="todo">
                    <p>Add Event to Todo List ?</p>
                    <input type="checkbox" name="todo" onChange={(e) => setTodo(e.target.checked)}/>
                </label>
                <div>
                    <button type="reset">CANCEL</button>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    )
}

const SelectedDayEvent = ({a,b}) => {
    return (
        <div>
            {a.event}
        </div>
    )
}


export const SelectedDay =() => {

    const [state,dispatch] = useContext(Context)


    return (
        <div className="SelectedDay">
            <h1>Selected Day</h1>
            <h1>{state.Calendar.selectDay}</h1>
            <div className="Options" onClick={() => dispatch({type :"TOGGLEADDEVENT"})}>
                <img src={plus} alt="add new event" />
            </div>
            <div className="SelectDayMain">
                {
                    state.Calendar.DayEvents[state.Calendar.selectDay] && state.Calendar.DayEvents[state.Calendar.selectDay].map((a,b) => {
                        return <SelectedDayEvent a={a} key={`${state.Calendar.selectDay}-Event-${a.id}`}/>
                    })
                }
            </div>

        </div>
    )
}
