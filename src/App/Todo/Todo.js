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
const DroppableItem = ({Todo,item,dispatch,setTodoDescription}) => {
    return (
        <Droppable droppableId={item}>
            {
                (provided) => (
                    <div 
                        className="TodoSection"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <h1>Todo durning work</h1>
                        {
                            Todo[item].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} setTodoDescription={setTodoDescription} /> )
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    )
}

const DragDropEvent = ({setTodoDescription}) => {

    const [state,dispatch] = useContext(Context)
    const Todo = state.Todo

    const DragEnd = (e) => {

        if(e.source.droppableId === e.destination.droppableId && e.source.index === e.destination.index) return;

        let lists = JSON.parse(JSON.stringify(Todo[e.source.droppableId]))
        let liste = JSON.parse(JSON.stringify(Todo[e.destination.droppableId]))
        let es = e.source.index
        let ee = e.destination.index;
        let item;

        lists = lists.filter((a,b) => {
                    if(b !== es)return a;

                    item = a;
                    return null;
                })
        
        if(e.source.droppableId === e.destination.droppableId){
            lists.splice(ee,0,item)
            Todo[e.destination.droppableId] = lists;
        }else {
            item.todoSet = e.destination.droppableId
            if(item.isInCalendar)
                state.Calendar.DayEvents[item.day] = state.Calendar.DayEvents[item.day].map(a => a.id === item.id ? item : a );
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
                <DroppableItem item={"normal"} key={"normal"} Todo={Todo} dispatch={dispatch}  setTodoDescription={setTodoDescription} />
            </>
            <>
                <DroppableItem item={"durning work"} key={"durning work"} Todo={Todo} dispatch={dispatch}  setTodoDescription={setTodoDescription} />
            </>
            <>
                <DroppableItem item={"finished"} key={"finished"} Todo={Todo} dispatch={dispatch}  setTodoDescription={setTodoDescription} />
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
                            <input 
                                type="radio" 
                                name="set" 
                                value="normal" 
                                onChange={() => settodoSet("normal")}  
                                checked={todoSet === "normal"} 
                            />

                            <br />
                            <p>durning work</p>
                            <input 
                                type="radio" 
                                name="set" 
                                value="durning work" 
                                onChange={() => settodoSet("durning work")}  
                                checked={todoSet === "durning work"} 
                            />
        
                            <br />
                            <p>finished</p>
                            <input 
                                type="radio" 
                                name="set" 
                                value="finished" 
                                onChange={() => settodoSet("finished")}  
                                checked={todoSet === "finished"} 
                            />
                            
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

    const [edit, setEdit] = useState(false)

    const HandleClick = () => {
        Todo.selectedTodo = null;
        setTodoDescription(false)
    }


    return (
        <>
        {
            !edit ? (
                <>
                <h1>Todo Description id {Todo.selectedTodo.id} </h1>
                <p>{Todo.selectedTodo.title}</p>
                <p>{Todo.selectedTodo.description}</p>
                <p>{Todo.selectedTodo.todo ? "true" : "false"}</p>
                <p>{Todo.selectedTodo.todoSet}</p>
                <p>{Todo.selectedTodo.day}</p>
                <p>{Todo.selectedTodo.isInCalendar ? "true" : "false"}</p>
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