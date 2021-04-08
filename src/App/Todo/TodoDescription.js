import React, {useContext, useState,useEffect} from "react"
import {Context} from "./../../UseReducer"

const GetDay = (d,s) => {
    d = d.split("-")
    let m = d[1];
    let dd = d[2]
    m = m.split("")
    dd = dd.split("")
    if(s === "unshift"){
        if(m[0] !== "0" && m.length === 1) m.unshift("0")
        if(dd[0] !== "0" && dd.length === 1) dd.unshift("0")
    }else {
        if(m[0] === "0" && m.length === 2) m.shift()
        if(dd[0] === "0" && dd.length === 2) dd.shift()
    }
    m = m.join("")
    dd = dd.join("")
    d[1] = m;
    d[2] = dd;
    d = d.join("-")
    return d;
}

const EditTodo = ({setEdit,setTodoDescription}) => {

    const [state,dispatch] = useContext(Context)
    const Todo = state.Todo
    const [title,setTitle] = useState(Todo.selectedTodo.title)
    const [description,setdescription] = useState(Todo.selectedTodo.description)
    const [todo,settodo] = useState(Todo.selectedTodo.todo)
    const [todoSet,settodoSet] = useState(Todo.selectedTodo.todoSet)
    const [isInCalendar,setisInCalendar] = useState(Todo.selectedTodo.isInCalendar)
    const [day, setDay] = useState(Todo.selectedTodo.day) 
    const [cal, setCal] = useState()

    

    useEffect(() => {
        let d;
        !day ? d = state.Calendar.currentDay : d = day
        d = GetDay(d,"unshift")
        setCal(d)
    }, [day,state.Calendar.currentDay,cal])

    const ChangeDay = (e,) => {
        let d = e.target.value;
        d = GetDay(d,"shift")
        setDay(d)
    }


    const HandleClick = () => {
        setTitle(Todo.selectedTodo.title)
        setdescription(Todo.selectedTodo.description)
        settodo(Todo.selectedTodo.todo)
        settodoSet(Todo.selectedTodo.todoSet)
        setisInCalendar(Todo.selectedTodo.isInCalendar)
        setDay(Todo.selectedTodo.day)
    }

    const SubmitEdit = (e) => {
        (todo === false) && settodoSet("")
        if(todo === false && isInCalendar === false){
            alert("todo or todo In Calendar must be chacked")
            settodo(Todo.selectedTodo.todo)
            settodoSet(Todo.selectedTodo.todoSet)
            setisInCalendar(Todo.selectedTodo.isInCalendar)
            setDay(Todo.selectedTodo.day)
        }else {
            dispatch({
                type : "SUBMITTODOEDIT",
                todo : {
                    day : isInCalendar === false ? "" : day ? day : state.Calendar.currentDay,
                    id :Todo.selectedTodo.id,
                    title,
                    description,
                    todo,
                    todoSet,
                    isInCalendar
                }
            })
            if(todo === false) setTodoDescription(false)
            setEdit(false)
        }
    }

    return (
        <div className="editTodo">
            <h1>Edit todo id {Todo.selectedTodo.id}</h1>
            <form onSubmit={SubmitEdit}>
                <label htmlFor="title" className="title">
                    <p>Todo Title</p>
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                </label>
                <label htmlFor="description" className="description">
                    <p>Todo Description</p>
                    <textarea style={{resize: "none"}} type="text" name="description" onChange={(e) => setdescription(e.target.value)} value={description}/>
                </label>
                <br />
                <label htmlFor="inCalendar" className="cal">
                    todo in calendar :
                    <input type="checkbox" name="todo" onChange={(e) => setisInCalendar(e.target.checked)} checked={isInCalendar} />
                </label>
                {
                    isInCalendar && (
                        <label htmlFor="isincalendar" className="setcal" >
                            <input type="date" name="isincalendar" value={cal} onChange={ChangeDay} />
                        </label>
                    )
                }
                <label htmlFor="todo" className="todo" >
                    <p>todo</p>
                    <input type="checkbox" name="todo" onChange={(e) => settodo(e.target.checked)} checked={todo} />
                </label>
                {
                    todo && (
                        <>
                        <label htmlFor="set" className="set">
                            Todo set :
                            <div>
                                <p>Normal</p>
                                <input 
                                    type="radio" 
                                    name="set" 
                                    value="normal" 
                                    onChange={() => settodoSet("normal")}  
                                    checked={todoSet === "normal"} 
                                />
                            </div>

                            <div>
                                <p>durning work</p>
                                <input 
                                    type="radio" 
                                    name="set" 
                                    value="durning work" 
                                    onChange={() => settodoSet("durning work")}  
                                    checked={todoSet === "durning work"} 
                                />
                            </div>

                            <div>
                                <p>finished</p>
                                <input 
                                    type="radio" 
                                    name="set" 
                                    value="finished" 
                                    onChange={() => settodoSet("finished")}  
                                    checked={todoSet === "finished"} 
                                />
                            </div>
                            
                        </label>
                        </>
                    )
                }
                <button type="submit" className="save">save</button>
            </form>
            <div className="btns">
                <button onClick={() => setEdit(false)}>back</button>
                <button onClick={HandleClick}>Restart</button>
            </div>
        </div>
    )
}



export const TodoDescription = ({Todo,setTodoDescription}) => {

    const [edit, setEdit] = useState(false)

    const HandleClick = () => {
        Todo.selectedTodo = null;
        setTodoDescription(false)
    }


    return (
        <>
        {
            !edit ? (
                <div  className="infoTOdoDescription">
                <h1>Todo Description id {Todo.selectedTodo.id} </h1>
                <p>Title : {Todo.selectedTodo.title}</p>
                <p>Description <br /> {Todo.selectedTodo.description}</p>
                <p>Todo : {Todo.selectedTodo.todo ? "true" : "false"}</p>
                <p>Todo type : {Todo.selectedTodo.todoSet}</p>
                <p>Day : {Todo.selectedTodo.day}</p>
                <p>In Calendar checked : {Todo.selectedTodo.isInCalendar ? "true" : "false"}</p>
                <button onClick={HandleClick} >Back</button>
                <button onClick={() => setEdit(true)} >Edit</button>
                </div>
            ) : (
                <EditTodo setEdit={setEdit} setTodoDescription={setTodoDescription} />
            ) 
        }
        </>
    )
}



export const AddNew = ({setAdd}) => {

    const [state,dispatch] = useContext(Context)
    const Todo = state.Todo


    const [title,setTitle] = useState()
    const [description,setdescription] = useState()
    const [todoSet,settodoSet] = useState("normal")


    const [InCal, setInCal] = useState(false)
    const [day, setDay] = useState(state.Calendar.currentDay) 
    const [cal, setCal] = useState()

    useEffect(() => {
        let d;
        !day ? d = state.Calendar.currentDay : d = day
        d = GetDay(d,"unshift")
        setCal(d)
    }, [day,state.Calendar.currentDay,cal])

    const ChangeDay = (e,) => {
        let d = e.target.value;
        d = GetDay(d,"shift")
        setDay(d)
    }
    
    const Reset = () => {
        setTitle()
        setdescription()
        settodoSet("normal")
        setInCal(false)
        setDay(state.Calendar.currentDay)
        setCal()
    }

    const Submit = (e) => {
        e.preventDefault()
        dispatch({
            type : "ADDNEWEVENT",
            event : {
                day : InCal === false ? "" : day ,
                id : state.Calendar.eventId + 1,
                title,
                description,
                todo : true,
                todoSet,
                isInCalendar : InCal
            }
        })
        Reset()
        setAdd(false)
    }


    return (
        <div className="AddNewTodo">
            <h1>Add new Event</h1>
            <h2>To {state.Calendar.selectDay}</h2>
            <form onReset={Reset} onSubmit={Submit} >
                <label htmlFor="title" className="title">
                    <p>Todo Title</p>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label htmlFor="description" className="description">
                    <p>Todo Description</p>
                    <textarea style={{resize: "none"}} type="text" name="description" value={description} onChange={(e) => setdescription(e.target.value)} />
                </label>
                <label htmlFor="set" className="set">
                    <div>
                        <p>Normal</p>
                        <input type="radio" name="set" value="normal" onChange={(e) => settodoSet(e.target.value)} checked={todoSet === "normal"} />
                    </div>
                    <div>
                        <p>durning work</p>
                        <input type="radio" name="set" value="durning work" onChange={(e) => settodoSet(e.target.value)} checked={todoSet === "durning work"} />
                    </div>
                    <div>
                        <p>finished</p>
                        <input type="radio" name="set" value="finished" onChange={(e) => settodoSet(e.target.value)} checked={todoSet === "finished"} />
                    </div>
                </label>
                <label htmlFor="cal" className="cal">
                    <p>Add Todo to Calendar</p>
                    <input type="checkbox" name="cal" checked={InCal} onChange={(e) => setInCal(e.target.checked)} />
                </label>
                {
                    InCal && (
                        <>

                        <label htmlFor="isincalendar" className="setcal">
                            <input type="date" name="isincalendar" value={cal} onChange={ChangeDay} />
                        </label>
                        </>
                    )
                }
                <div className="btns">
                    <button type="reset">CANCEL</button>
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    )

}