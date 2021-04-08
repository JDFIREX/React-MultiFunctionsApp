import React, {useContext, useState} from "react"
import {Context} from "./../../UseReducer"
import {DragDropContext,Droppable, Draggable} from "react-beautiful-dnd"
import {TodoDescription, AddNew} from "./TodoDescription"
import "./Todo.css"
import plus from "./../../images/plus.svg"

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
                        <h1>Todo {item}</h1>
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

const AddBtn = ({setAdd, add}) => {
    return (
        <>
            <div className="addNew" onClick={() => setAdd(!add)}>
                <img src={plus} alt="add new todo" />
            </div>
        </>  

    )
}


const Todo= () => {

    const [state,dispatch] = useContext(Context)
    const [Tododescription, setTodoDescription] = useState(false)
    const [add, setAdd] = useState(false)
    const Todo = state.Todo

    console.log(Todo)

    if(add){
        return (
            <>
                <AddNew setAdd={setAdd} />
                <AddBtn setAdd={setAdd} add={add} />
            </>
        )
    }

    if(Tododescription){
        return (
            <div className="TodoDescription">
                <TodoDescription Todo={Todo} dispatch={dispatch}  setTodoDescription={setTodoDescription}/>
            </div>
        )
    } else {
        return(
            <>
                <div className="Todo">
                    <DragDropEvent setTodoDescription={setTodoDescription}  />
                </div>
                <AddBtn setAdd={setAdd} add={add} />
            </>
        )
    }
}


export default Todo