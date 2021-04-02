import React,{useContext,useState,useEffect} from "react"
import {Context} from "./../../UseReducer"
import plus from "./../../images/plus.svg"
import deleteItem from "./../../images/trash.svg"

export const AddNewEvent = () => {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [todo,setTodo] = useState(false)
    const [state,dispatch] = useContext(Context)
        
    // console.log(state.Calendar)

    const ResetForm = (e) => {
        e.preventDefault()
        setTitle("")
        setDescription("")
        setTodo(false)
        dispatch({type :"TOGGLEADDEVENT"})
    }
    const SubmitForm = (e) => {
        e.preventDefault()

        if(todo){

        }else{
            dispatch({type : "ADDNEWEVENT", day : `${state.Calendar.selectDay}`, event : {
                title,
                description,
                id : (state.Calendar.eventId + 1),
                todo
            }})
            setTitle("")
            setDescription("")
            setTodo(false)
        }

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

export const DescriptionEvent= () => {

    const [state,dispatch] = useContext(Context)
    console.log(state)
    const [edit,setEdit] = useState(false)
    const [title,setTitle] = useState(state.Calendar.selectedDescriptionEvent.title)
    const [description,setDescription] = useState(state.Calendar.selectedDescriptionEvent.description)
    const [todo,setTodo] = useState(state.Calendar.selectedDescriptionEvent.todo)


    console.log(state.Calendar.selectedDescriptionEvent)

    useEffect(() => {
        setEdit(false)
        setTitle(state.Calendar.selectedDescriptionEvent.title)
        setDescription(state.Calendar.selectedDescriptionEvent.description)
        setTodo(state.Calendar.selectedDescriptionEvent.todo)
    },[state.Calendar.selectedDescriptionEvent])

    const SubmitEdit = (e) => {
        e.preventDefault()

        if(todo){

        }else{
            dispatch({
                type : "SUBMITEDITEVENT", 
                day : `${state.Calendar.selectDay}`, 
                event : {
                    title,
                    description,
                    id : state.Calendar.selectedDescriptionEvent.id,
                    todo
                }
            })
            setTitle("")
            setDescription("")
            setTodo(false)
        }
    }

    return (
        <div className="DescriptionDay">
        {
            edit === false ? (
                <>
                <h1>Day : {state.Calendar.selectDay}</h1>
                <h1>Title : {state.Calendar.selectedDescriptionEvent.title}</h1>
                <h1>Description : {state.Calendar.selectedDescriptionEvent.description}</h1>
                <h1>todo : {state.Calendar.selectedDescriptionEvent.todo === false ? "false" : "true"}</h1>
                <button
                    onClick={() => setEdit(!edit)}
                >Edit</button>
                </>
            ) : (
                <div>
                    <form onSubmit={SubmitEdit}>
                        <h1>Edit day {state.Calendar.selectDay} event id {state.Calendar.selectedDescriptionEvent.id} </h1>
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
                            <input type="checkbox" name="todo" onChange={(e) => setTodo(e.target.checked)} checked={todo} />
                        </label>
                        <button type="submit">save</button>
                    </form>
                </div>
            )
        }
        </div>
    )
}

const SelectedDayEvent = ({a,b,dispatch}) => {



    return (
        //
        <div className="SeledDayItem"
            onClick={() => dispatch({
                type : "SELECTEVENT",
                id : a.id
            })}
        >
            <h2>{a.title}</h2>
            <img src={deleteItem} alt="delete  item" onClick={() => dispatch({
                type : "DELETEEVENT",
                id : a.id
            })} />
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
            <div className="SelectDayMain" onClick={(e) => e.target.classList[0] === "SelectDayMain" ? dispatch({type : "TOGGLEDESCRIPTIONEVENT"}) : null} > 
                {
                    state.Calendar.DayEvents[state.Calendar.selectDay] && state.Calendar.DayEvents[state.Calendar.selectDay].map((a,b) => {
                        return <SelectedDayEvent a={a} key={`${state.Calendar.selectDay}-Event-${a.id}`} dispatch={dispatch} />
                    })
                }
            </div>

        </div>
    )
}
