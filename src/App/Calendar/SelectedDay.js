import React,{useContext,useState,useEffect} from "react"
import {Context} from "./../../UseReducer"
import plus from "./../../images/plus.svg"
import deleteItem from "./../../images/trash.svg"
import {DragDropContext,Droppable, Draggable} from "react-beautiful-dnd"

export const AddNewEvent = () => {

    const [state,dispatch] = useContext(Context)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [todo,setTodo] = useState(false)
    const [todoSet, setTodoSet ] = useState("")
        

    const ResetForm = (e) => {
        e.preventDefault()
        setTitle("")
        setDescription("")
        setTodo(false)
        dispatch({type :"TOGGLEADDEVENT"})
    }
    const SubmitForm = (e) => {
        e.preventDefault()

        dispatch({type : "ADDNEWEVENT", day : `${state.Calendar.selectDay}`, event : {
            title,
            description,
            id : (state.Calendar.eventId + 1),
            day : state.Calendar.selectDay,
            todo,
            todoSet,
            isInCalendar : true
        }})
        setTitle("")
        setDescription("")
        setTodoSet("")
        setTodo(false)
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
                {
                    todo && (
                        <label htmlFor="set">
                            <br />
                            Todo set :
                            <p>Normal</p>
                            <input type="radio" name="set" value="normal" onChange={() => setTodoSet("normal")} />
                            <br />
                            <p>durning work</p>
                            <input type="radio" name="set" value="durning work" onChange={() => setTodoSet("durning work")} />
                            <br />
                            <p>finished</p>
                            <input type="radio" name="set" value="finished" onChange={() => setTodoSet("finished")} />
                        </label>
                    )
                }
                <div>
                    <button type="reset">CANCEL</button>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    )
}
const EventInfo = ({state,edit,setEdit}) => (
    <>
        <h1>Day : {state.Calendar.selectDay}</h1>
        <h1>Title : {state.Calendar.selectedDescriptionEvent.title}</h1>
        <h1>Description : {state.Calendar.selectedDescriptionEvent.description}</h1>
        <h1>todo : {state.Calendar.selectedDescriptionEvent.todo === false ? "false" : "true"}</h1>
        <h1>todoSet : {state.Calendar.selectedDescriptionEvent.todoSet}</h1>
        <button
            onClick={() => setEdit(!edit)}
        >Edit</button>
    </>
)

export const DescriptionEvent= () => {

    const [state,dispatch] = useContext(Context)
    const [edit,setEdit] = useState(false)
    const [title,setTitle] = useState(state.Calendar.selectedDescriptionEvent.title)
    const [description,setDescription] = useState(state.Calendar.selectedDescriptionEvent.description)
    const [todo,setTodo] = useState(state.Calendar.selectedDescriptionEvent.todo)
    const [todoSet, setTodoSet ] = useState("")
    const [InCalendar,setInCalendar] = useState(state.Calendar.selectedDescriptionEvent.isInCalendar)

    useEffect(() => {
        setEdit(false)
    },[])

    useEffect(() => {
        if(todo === false) {
            setTodoSet("")
            setInCalendar(true)
        }
    },[todo])


    const SubmitEdit = (e) => {
        e.preventDefault()

        dispatch({
            type : "SUBMITEDITEVENT", 
            day : `${state.Calendar.selectDay}`, 
            event : {
                title,
                description,
                id : state.Calendar.selectedDescriptionEvent.id,
                day : state.Calendar.selectDay,
                todo,
                todoSet,
                isInCalendar : InCalendar
            }
        })
        setTitle("")
        setDescription("")
        setTodo(false)
        setTodoSet("")
    }

    return (
        <div className="DescriptionDay">
        {
            edit === false ? (
                <EventInfo state={state} edit={edit} setEdit={setEdit} />
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
                        {
                            todo && (
                                <>
                                <label htmlFor="set">
                                    <br />
                                    Todo set :
                                    <p>Normal</p>
                                    <input 
                                        type="radio" 
                                        name="set" 
                                        value="normal" 
                                        onChange={() => setTodoSet("normal")}
                                        checked={todoSet === "normal"} 
                                    />

                                    <br />
                                    <p>durning work</p>
                                    <input 
                                        type="radio" 
                                        name="set" 
                                        value="durning work" 
                                        onChange={() => setTodoSet("durning work")}
                                        checked={todoSet === "durning work"} 
                                    />
                                    
                                    <br />
                                    <p>finished</p>
                                    <input 
                                        type="radio" 
                                        name="set" 
                                        value="finished" 
                                        onChange={() => setTodoSet("finished")}
                                        checked={todoSet === "finished"} 
                                    />
                                    
                                </label>
                                <label htmlFor="inCalendar">
                                    todo in calendar :
                                    <input type="checkbox" name="todo" onChange={(e) => setInCalendar(e.target.checked)} checked={InCalendar} />
                                </label>
                                </>
                            )
                        }
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
        <Draggable draggableId={`${a.id}`} index={b}>
            {
                (provided) => (
                    <div 
                        className="SeledDayItem"
                        onClick={() => dispatch({
                            type : "SELECTEVENT",
                            id : a.id
                        })}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <h2>{a.title}</h2>
                        <img src={deleteItem} alt="delete  item" onClick={() => dispatch({
                            type : "DELETEEVENT",
                            id : a.id
                        })} />
                    </div>
                )
            }
        </Draggable>
    )
}


export const SelectedDay =() => {

    const [state,dispatch] = useContext(Context)

    const DragEnd = (e) => {
        let is = e.source.index;
        let ie = e.destination.index;

        if(is === ie)return;

        let item = state.Calendar.DayEvents[state.Calendar.selectDay][is]
        let newList = state.Calendar.DayEvents[state.Calendar.selectDay].filter((a,b) => b !== is)
        newList.splice(ie,0,item);

        dispatch({
            type : "CHANGEORDER",
            list : newList
        })

    }


    return (
        <div className="SelectedDay">
            <h1>Selected Day</h1>
            <h1>{state.Calendar.selectDay}</h1>
            <div className="Options" onClick={() => dispatch({type :"TOGGLEADDEVENT"})}>
                <img src={plus} alt="add new event" />
            </div>
            <DragDropContext onDragEnd={DragEnd} >
                <Droppable droppableId={"1"}>
                {
                    (provided) => (
                        <div 
                            className="SelectDayMain" 
                            onClick={(e) => e.target.classList[0] === "SelectDayMain" ? dispatch({type : "TOGGLEDESCRIPTIONEVENT"}) : null} 
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        > 
                            {
                                state.Calendar.DayEvents[state.Calendar.selectDay] && state.Calendar.DayEvents[state.Calendar.selectDay].map((a,b) => {
                                    return <SelectedDayEvent a={a} key={`${state.Calendar.selectDay}-Event-${a.id}`} b={b} dispatch={dispatch} />
                                })
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
                </Droppable>
            </DragDropContext>

        </div>
    )
}
