import React, {useContext, useState,useEffect} from "react"
import {Context} from "./../../UseReducer"
import {DragDropContext,Droppable, Draggable} from "react-beautiful-dnd"
import "./Todo.css"

const TodoItem = ({a,b,dispatch,setTodoDescription}) => {

    const HandleClick = () => {
        setTodoDescription(true)
        dispatch({
            type : "SELECTTODO",
            todo : a
        })
    }

    return (
        <Draggable draggableId={`${a.id}`} index={b} >
            {
                (provided) => (
                    <div 
                        className={`todoItem ${a.todoSet}`}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        onClick={HandleClick}
                    >
                        {a.title}
                        <br />
                        {a.todoSet}
                        <br />
                        {a.day ? a.day : "nie ma ustalonego dnia"}
                    </div>
                )
            }
        </Draggable>
    )
}
const DragDropEvent = ({setTodoDescription}) => {

    const [state,dispatch] = useContext(Context)
    const Todo = state.Todo

    const DragEnd = (e) => {

        console.log(e)

        if(e.source.droppableId === e.destination.droppableId && e.source.index === e.destination.index){
            return;
        }

        let lists = JSON.parse(JSON.stringify(Todo[e.source.droppableId]))
        let es = e.source.index
        let liste = JSON.parse(JSON.stringify(Todo[e.destination.droppableId]))
        let ee = e.destination.index;
        let item;

        lists = lists.filter((a,b) => {
                    if(b !== es){
                        return a;
                    }else {
                        item = a;
                        return null;
                    }
                })
        
        if(e.source.droppableId === e.destination.droppableId){
            lists.splice(ee,0,item)
            Todo[e.destination.droppableId] = lists;
        }else {
            item.todoSet = e.destination.droppableId
            if(item.isInCalendar){
                state.Calendar.DayEvents[item.day] = state.Calendar.DayEvents[item.day].map(a => {
                    if(a.id === item.id){
                        return item
                    }else return a;
                })
            }
            Todo[e.source.droppableId] = lists;
            liste.splice(ee,0,item)
            Todo[e.destination.droppableId] = liste;
        }

        dispatch({
            type : "TOGGLEDESCRIPTIONEVENT"
        })
    }

    return (
        <DragDropContext onDragEnd={DragEnd} >
            <>
                <Droppable droppableId={"normal"}>
                    {
                        (provided) => (
                            <div 
                                className="TodoSection"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h1>Todo Normal</h1>
                                {
                                    Todo["normal"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} setTodoDescription={setTodoDescription} /> )
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </>
            <>
                <Droppable droppableId={"durning work"}>
                    {
                        (provided) => (
                            <div 
                                className="TodoSection"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h1>Todo durning work</h1>
                                {
                                    Todo["durning work"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} setTodoDescription={setTodoDescription} /> )
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </>
            <>
                <Droppable droppableId={"finished"}>
                    {
                        (provided) => (
                            <div 
                                className="TodoSection"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h1>Todo finished</h1>
                                {
                                    Todo["finished"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} setTodoDescription={setTodoDescription} /> )
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
            </>
        </DragDropContext>
    )
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
        if(!day){
            d = state.Calendar.currentDay
        }else{
            d = day;
        }
        d = d.split("-")
        let m = d[1];
        let dd = d[2]
        m = m.split("")
        dd = dd.split("")
        if(m[0] !== "0" && m.length === 1){
            m.unshift("0")
        }
        if(dd[0] !== "0" && dd.length === 1){
            dd.unshift("0")
        }
        m = m.join("")
        dd = dd.join("")
        d[1] = m;
        d[2] = dd;
        d = d.join("-")
        setCal(d)
    }, [day,state.Calendar.currentDay,cal])

    const ChangeDay = (e) => {
        let d = e.target.value;
        d = d.split("-")
        let m = d[1];
        let dd = d[2]
        m = m.split("")
        dd = dd.split("")
        if(m[0] === "0" && m.length === 2){
            m.shift()
        }
        if(dd[0] === "0" && dd.length === 2){
            dd.shift()
        }
        m = m.join("")
        dd = dd.join("")
        d[1] = m;
        d[2] = dd;
        d = d.join("-")
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
        e.preventDefault()   
        if(todo === false){
            settodoSet("")
        }
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
            if(todo === false){
                settodoSet("")
                setTodoDescription(false)
            }
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
                <label htmlFor="inCalendar">
                    todo in calendar :
                    <input type="checkbox" name="todo" onChange={(e) => setisInCalendar(e.target.checked)} checked={isInCalendar} />
                </label>
                {
                    isInCalendar && (
                        <label htmlFor="isincalendar">
                            day in calendar :
                            <input type="date" name="isincalendar" value={cal} onChange={ChangeDay} />
                        </label>
                    )
                }
                <label htmlFor="todo" className="todo">
                    <p>todo</p>
                    <input type="checkbox" name="todo" onChange={(e) => settodo(e.target.checked)} checked={todo} />
                </label>
                {
                    todo && (
                        <>
                        <label htmlFor="set">
                            <br />
                            Todo set :
                            <p>Normal</p>
                            {
                                todoSet === "normal" ? (
                                    <input type="radio" name="set" value="normal" onChange={() => settodoSet("")}  checked={true} />
                                ) : (
                                    <input type="radio" name="set" value="normal" onChange={() => settodoSet("normal")} checked={false} />
                                )
                            }
                            <br />
                            <p>durning work</p>
                            {
                                todoSet === "durning work" ? (
                                    <input type="radio" name="set" value="durning work" onChange={() => settodoSet("")} checked={true} />
                                ) : (
                                    <input type="radio" name="set" value="durning work" onChange={() => settodoSet("durning work")} checked={false} />
                                )
                            }
                            
                            <br />
                            <p>finished</p>
                            {
                                todoSet === "finished" ? (
                                    <input type="radio" name="set" value="finished" onChange={() => settodoSet("")} checked={true} />
                                ) : (
                                    <input type="radio" name="set" value="finished" onChange={() => settodoSet("finished")} checked={false} />
                                )
                            }
                            
                        </label>
                        </>
                    )
                }
                <button type="submit">save</button>
            </form>
            <button onClick={() => setEdit(false)}>back</button>
            <button onClick={HandleClick}>Restart</button>
        </div>
    )
}
const TodoDescription = ({Todo,setTodoDescription}) => {

    const [title,setTitle] = useState(Todo.selectedTodo.title)
    const [description,setdescription] = useState(Todo.selectedTodo.description)
    const [todo,settodo] = useState(Todo.selectedTodo.todo)
    const [todoSet,settodoSet] = useState(Todo.selectedTodo.todoSet)
    const [isInCalendar,setisInCalendar] = useState(Todo.selectedTodo.isInCalendar)
    const [edit, setEdit] = useState(false)

    const HandleClick = () => {
        Todo.selectedTodo = null;
        setTodoDescription(false)
    }

    useEffect(() => {
       setTitle(Todo.selectedTodo.title)
       setdescription(Todo.selectedTodo.description)
       settodo(Todo.selectedTodo.todo)
       settodoSet(Todo.selectedTodo.todoSet)
       setisInCalendar(Todo.selectedTodo.isInCalendar)
    }, [Todo])
    console.log(Todo)


    return (
        <>
        {
            !edit ? (
                <>
                <h1>Todo Description id {Todo.selectedTodo.id} </h1>
                <p>{title}</p>
                <p>{description}</p>
                <p>{todo ? "true" : "false"}</p>
                <p>{todoSet}</p>
                <p>{Todo.selectedTodo.day}</p>
                <p>{isInCalendar ? "true" : "false"}</p>
                <button onClick={HandleClick} >Back</button>
                <button onClick={() => setEdit(true)} >Edit</button>
                </>
            ) : (
                <EditTodo setEdit={setEdit} setTodoDescription={setTodoDescription} />
            ) 
        }
        </>
    )
}

const Todo= () => {

    const [state,dispatch] = useContext(Context)
    const [Tododescription, setTodoDescription] = useState(false)
    const Todo = state.Todo



    return (
        <>
            {
                Tododescription ? (
                    <div className="TodoDescription">
                        <TodoDescription Todo={Todo} dispatch={dispatch}  setTodoDescription={setTodoDescription}/>
                    </div>
                    ) : (
                        <div className="Todo">
                            <DragDropEvent setTodoDescription={setTodoDescription}  />
                        </div>
                    )
            }
        </>  

    )
}


export default Todo