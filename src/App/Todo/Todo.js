import React, {useContext} from "react"
import {Context} from "./../../UseReducer"
import {DragDropContext,Droppable, Draggable} from "react-beautiful-dnd"
import "./Todo.css"

const TodoItem = ({a,b,dispatch}) => {


    return (
        <Draggable draggableId={`${a.id}`} index={b} >
            {
                (provided) => (
                    <div 
                        className={`todoItem ${a.todoSet}`}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
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


const Todo= () => {

    const [state,dispatch] = useContext(Context)
    const Todo = state.Todo

    const DragEnd = (e) => {

        if(e.source.droppableId === e.destination.droppableId && e.source.index === e.destination.index){
            return;
        }

        if(e.source.droppableId === e.destination.droppableId && e.source.index !== e.destination.index){
            let list = Todo[e.source.droppableId];
            let es = e.source.index;
            let ee = e.destination.index
            let item;
            list = list.filter((a,b) => {
                if(b !== es){
                    return a;
                }else {
                    item = a;
                    return null;
                }
            })
            list.splice(ee,0,item)
            Todo[e.source.droppableId] = list;
        }

        if(e.source.droppableId !== e.destination.droppableId){
            let lists = Todo[e.source.droppableId]
            let es = e.source.index;
            let liste = Todo[e.destination.droppableId]
            let ee = e.destination.index
            let item;

            lists = lists.filter((a,b) => {
                if(b !== es){
                    return a;
                }else {
                    item = a;
                    return null;
                }
            })
            item.todoSet = e.destination.droppableId
            liste.splice(ee,0,item)
            Todo[e.source.droppableId] = lists;
            Todo[e.destination.droppableId] = liste;
        }

    }


    return (
        <div className="Todo">
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
                                        Todo["normal"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} /> )
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
                                        Todo["durning work"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} /> )
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
                                        Todo["finished"].map((a,b ) => <TodoItem key={a.id} b={b} a={a} dispatch={dispatch} /> )
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </>
            </DragDropContext>
        </div>
    )

}


export default Todo