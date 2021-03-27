import React from "react"
import  CalendarLogo from "./images/calendar.svg"
import  clockLogo from "./images/clock.svg"
import  stopwatchLogo from "./images/stopwatch.svg"
import  listLogo from "./images/list.svg"
import  LocalizationLogo from "./images/Localization.svg"
import  cloudLogo from "./images/cloud.svg"
import  cityLogo from "./images/city.svg"

export const Logos = [CalendarLogo,
    clockLogo,
    stopwatchLogo,
    listLogo,
    LocalizationLogo,
    cloudLogo,
    cityLogo,]

const date = new Date()


export const GetMonthName = (m) => {
    switch(m){
        case 1 :
            return "JANUARY"; 
        case 2 :
          return "FEBRUARY"; 
        case 3 :
           return "MARCH"; 
        case 4 :
           return "APRIL"; 
        case 5 :
           return "MAY"; 
        case 6 :
           return "JUNE";
        case 7 :
           return "JULY"; 
        case 8 :
           return "AUGUST"; 
        case 9 :
           return "SEPTEMBER";
        case 10 :
            return "OCTOBER"; 
        case 11 :
           return "NOVEMBER";
        case 12 :
           return "DECEMBER";
        default : return "";
    }
}



export const initalState = {
    Calendar : {
        logo : 0,
        show : "days",
        currentDay : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        selectDay : `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        Year : date.getFullYear(),
        Month : date.getMonth() + 1,
        MonthName : GetMonthName(date.getMonth() + 1),
        daysInMonth : new Date(date.getFullYear(),date.getMonth() + 2,0).getDate(),
        YearPar : [2019,2030],
        inner : `${GetMonthName(date.getMonth() + 1)} ${date.getFullYear()}`,
        DayEvents : {

        }
    },
    Todo : {
        logo: 3,
        TodoList : {

        },
        TodoInProgress : {
            
        },
        TodoFinished : {

        }
    },
    Location : {
        logo : 4,
    },
    Weather : {
        logo : 5,
        currentWeather : null,

    },
    Clock: {
        logo : 1,
        currentTime : null,
        setTime : null,
    },
    CityList : {
        logo : 6,
        list : []
    },
    Timer : {
        logo : 2,
    }
}

export const reducer = (state,action) => {
    switch(action.type){
        // year dec
        case "YEAR DEC" :
            const newDate = new Date(state.Calendar.Year - 1, state.Calendar.Month - 1, 1)
            let newPart = [];
            if(state.Calendar.Year - 1 < 2019){
                newPart = [state.Calendar.YearPar[0] - 10,  state.Calendar.YearPar[1] - 10]
            }else {
                newPart = state.Calendar.YearPar;
            }

            return {
                ...state,
                Calendar : {
                    Year : newDate.getFullYear(),
                    Month : newDate.getMonth() + 1,
                    MonthName : GetMonthName(newDate.getMonth() + 1),
                    inner : `${GetMonthName(newDate.getMonth() + 1)} ${newDate.getFullYear()}`,
                    daysInMonth : new Date(newDate.getFullYear(),newDate.getMonth() + 2,0).getDate(),
                    YearPar : newPart,
                }
            }
        // year inc

        default :
            return;
    }
}


// console.log(initalState)


export const Context = React.createContext(initalState)



