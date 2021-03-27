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
        selectDay : `${date.getFullYear()}-${date.getMonth() + 1 }-${date.getDate()}`,
        firstDay : new Date(date.getFullYear(),date.getMonth(),1).getDay(),
        back : 2 - (new Date(date.getFullYear(),date.getMonth(),1).getDay()),
        Year : date.getFullYear(),
        Month : date.getMonth(),
        MonthName : GetMonthName(date.getMonth() + 1),
        daysInMonth : new Date(date.getFullYear(),date.getMonth() + 1,0).getDate(),
        YearPart : [2019,2030],
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

const NewCalendar = (state,newDate,part = false) => {

    let newPart;
    part === false ? newPart = state.Calendar.YearPart : newPart = part;

    return {
        ...state,
        Calendar : {
            ...state.Calendar,
            Year : newDate.getFullYear(),
            inner : `${GetMonthName(newDate.getMonth() + 1)} ${newDate.getFullYear()}`,
            daysInMonth : new Date(newDate.getFullYear(),newDate.getMonth() + 1,0).getDate(),
            YearPar : newPart,
            Month : newDate.getMonth(),
            MonthName : GetMonthName(newDate.getMonth()),
            firstDay : newDate.getDay(),
            back : 2 - (newDate.getDay()),
        }
    }
}

export const reducer = (state,action) => {
    switch(action.type){
        // year dec
        case "YEAR DEC" :

            const DateDEC = new Date(state.Calendar.Year - 1, state.Calendar.Month, 1)
            let newPart = [];
            if((state.Calendar.Year - 1) < state.Calendar.YearPart[0] ){
                newPart = [state.Calendar.YearPart[0] - 10,  state.Calendar.YearPart[1] - 10]
            }else {
                newPart = state.Calendar.YearPart;
            }
            return NewCalendar(state,DateDEC,newPart)

        // year inc
        case "YEAR INC" :

            const dateINC = new Date(state.Calendar.Year + 1, state.Calendar.Month, 1)
            let newPartINC = [];
            if((state.Calendar.Year + 1) > (state.Calendar.YearPart[1])){
                newPartINC = [state.Calendar.YearPart[0] + 10,  state.Calendar.YearPart[1] + 10]
            }else {
                newPartINC = state.Calendar.YearPart;
            }
            return NewCalendar(state,dateINC,newPartINC)

        // ONLYYEAR DEC
        case "ONLYYEAR DEC" :

            let onlyYearDec = state.Calendar.Year - 1;
            let onlyYearDecPart = [];
            if((state.Calendar.Year - 1 ) < state.Calendar.YearPart[0]){
                onlyYearDecPart = [state.Calendar.YearPart[0] - 10,  state.Calendar.YearPart[1] - 10]
            }else {
                onlyYearDecPart = state.Calendar.YearPart;
            }

            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    YearPart : onlyYearDecPart,
                    Year : onlyYearDec,
                    inner : `${onlyYearDec}`
                }
            }

        // only YEAR INC
        case "ONLYYEAR INC" :

            let onlyYearINC = state.Calendar.Year + 1;
            let onlyYearINCPart = [];
            if((state.Calendar.Year + 1) > state.Calendar.YearPart[1]){
                onlyYearINCPart = [state.Calendar.YearPart[0] + 10,  state.Calendar.YearPart[1] + 10]
            }else {
                onlyYearINCPart = state.Calendar.YearPart;
            }

            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    YearPart : onlyYearINCPart,
                    Year :  onlyYearINC,
                    inner : `${onlyYearINC}`
                }
            }
        // YEARPART DEC
        case "YEARPART DEC" : 
            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    YearPart : [state.Calendar.YearPart[0] - 10, state.Calendar.YearPart[1] - 10],
                    inner : `${state.Calendar.YearPart[0] - 10} - ${state.Calendar.YearPart[1] - 10}`
                }
            }
        // YEARPART INC
        case "YEARPART INC" : 
            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    YearPart : [state.Calendar.YearPart[0] + 10, state.Calendar.YearPart[1] + 10],
                    inner : `${state.Calendar.YearPart[0] + 10} - ${state.Calendar.YearPart[1] + 10}`
                }
            }
        // month dec
        case "MONTH DEC" :

            const DateMonthDec = new Date(state.Calendar.Year,state.Calendar.Month - 1,1);
            return NewCalendar(state,DateMonthDec)

        // Month inc
        case "MONTH INC" :

            const DateMonthInc = new Date(state.Calendar.Year,state.Calendar.Month  + 1,1);
            return NewCalendar(state,DateMonthInc)
            
        // select day
        case "SELECTDAY" :

            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    selectDay : action.day
                }
            }
        // select day from other month
        case "SELECTMONTHDAY" :

            let selectmonthday;
            if(action.f === "dec"){
                selectmonthday = new Date(state.Calendar.Year,state.Calendar.Month - 1,1);
            }else{
                selectmonthday = new Date(state.Calendar.Year,state.Calendar.Month + 1,1);
            }

            let selectstate = NewCalendar(state,selectmonthday)

            return {
                ...selectstate,
                Calendar : {
                    ...selectstate.Calendar,
                    selectDay : action.d
                }
            }

        //Change show
        case "CHANGE SHOW" :
            let nextshow;
            let nextInner;
            if(state.Calendar.show === "days"){
                nextshow = "months"
                nextInner = `${state.Calendar.Year}`;
            }else if(state.Calendar.show === "months"){
                nextshow = "years"
                nextInner = `${state.Calendar.YearPart[0]} - ${state.Calendar.YearPart[1]}`;

            }

            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    show : nextshow,
                    inner : nextInner
                }
            }

        // select month in year
        case "SELECTMONTH" :

            let selectmonth = new Date(state.Calendar.Year,action.monthid,1);
            let selectmonthstate = NewCalendar(state,selectmonth)
            return {
                ...selectmonthstate,
                Calendar : {
                    ...selectmonthstate.Calendar,
                    show : "days"
                }
            }
        // select year from year part
        case "SELECTYEAR" : 
            return {
                ...state,
                Calendar : {
                    ...state.Calendar,
                    show : "months",
                    Year : action.YearID,
                    inner : `${action.YearID}`
                }
            }
        default :
            return;
    }
}


// console.log(initalState)


export const Context = React.createContext(initalState)



