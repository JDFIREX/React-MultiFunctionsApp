import React, {useReducer} from "react"
import ReactDOM from "react-dom"
import {initalState,reducer,Context} from "./UseReducer"
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Main from "./App/Main/Main"
import Nav from "./App/Nav/Nav"
import Calendar from "./App/Calendar/Calendar"
import Todo from "./App/Todo/Todo"
import Location from "./App/Location/Location"
import Weather from "./App/Weather/Weather"
import Clock from "./App/Clock/Clock"
import CityList from "./App/CityList/CityList"
import Timer from "./App/Timer/Timer"
import "./indesc.css"


const Root = () => {

    const [state,dispatch] = useReducer(reducer,initalState)

    return (
        <React.StrictMode>
            <Context.Provider value={[state,dispatch]}>

            <Router>
                <>
                    <Nav />
                    <div className="Container">
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/Calendar" component={Calendar} />
                            <Route path="/Todo" component={Todo} />
                            <Route path="/Location" component={Location} />
                            <Route path="/Weather" component={Weather} />
                            <Route path="/Clock" component={Clock} />
                            <Route path="/CityList" component={CityList} />
                            <Route path="/Timer" component={Timer} />
                            <Route path="*" component={Main} />
                        </Switch>
                    </div>
                </>
                </Router>
            </Context.Provider>
        </React.StrictMode>
    )
}


ReactDOM.render(<Root />, document.querySelector(".root"))

