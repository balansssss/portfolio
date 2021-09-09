import axios from "axios";
import {CHANGE_SORT, LOAD_TICKETS, SET_ERRMES, SET_SEARCHID, SET_TICKETS} from "./actionType";
import cls from "../App.module.css";

const setSearchId = searchId => {
    return {
        type: SET_SEARCHID,
        searchId
    }
}

const setErrMEs = errMes => {
    return {
        type: SET_ERRMES,
        errMes
    }
}

const setTickets = (allTickets, tickets) => {
    return {
        type: SET_TICKETS,
        allTickets,
        tickets
    }
}

const changeSortAction = (sortParam, sortParamsClass, tickets) => {
    return {
        type: CHANGE_SORT,
        sortParam,
        sortParamsClass,
        tickets
    }
}

const loadTicketsAction = tickets => {
    return {
        type: LOAD_TICKETS,
        tickets
    }
}

const sortByParam = param => {
    return (a, b) => {
        if(a[param] > b[param]) {
            return 1
        } else {
            return -1
        }
    }
}

const sortTickets = (arr, param/* = this.state.sortParam*/)  => {
    switch (param) {
        case 'price':
            return arr.sort(sortByParam(param))
        case 'duration':
            arr.forEach(t=>{
                t.duration = t.segments[0].duration + t.segments[1].duration
            })
            return arr.sort(sortByParam(param))
        default:
            return arr
    }
}

export const changeSortParam = param => {
    return (dispatch, getState) => {
        const state = {...getState().ticketsReducer}
        const tickets = sortTickets(state.tickets, param)
        const sortParamsClass = state.sortParamsClass
        for (let p in sortParamsClass) {
            sortParamsClass[p] = null
        }
        sortParamsClass[param] = cls.active
        dispatch(changeSortAction(param, sortParamsClass, tickets))
    }
}

export const getTickets = () => {
    return dispatch => {
        let searchId = null
        axios.get('https://front-test.beta.aviasales.ru/search').then(response => {
            if (response.status === 200) {
                searchId = response.data.searchId
                dispatch(setSearchId(response.data.searchId))
            } else {
                dispatch(setErrMEs(response.statusText))
            }
        }).then(() => {
            axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`).then(response => {
                if (response.status === 200) {
                    const tickets = response.data.tickets.slice(0, 5)
                    dispatch(setTickets(response.data.tickets, sortTickets(tickets, 'price')))
                } else {
                    dispatch(setErrMEs(response.statusText))
                }
            })
        })
    }
}

export const loadTickets = () => {
    return (dispatch, getState) => {
        const state = getState().ticketsReducer
        let tickets = state.tickets
        const ticketsLength = state.tickets.length
        const loadTickets = state.allTickets.slice(ticketsLength, ticketsLength+5)
        sortTickets(loadTickets, state.sortParam)
        tickets = tickets.concat(loadTickets)
        dispatch(loadTicketsAction(tickets))
    }
}

const parseFullDate = fulldate => {
    const year = fulldate.split("-")[0]
    const month = fulldate.split("-")[1]
    const date = fulldate.split("T")[0].split("-")[2]
    const hour = fulldate.split("T")[1].split(".")[0].split(":")[0]
    const minutes = fulldate.split("T")[1].split(".")[0].split(":")[1]
    return {
        year, month, date, hour, minutes
    }
}

export const formatTimeFlying = date => {
    const parseDate = parseFullDate(date)
    return `${parseDate.hour}:${parseDate.minutes}`
}

export const formatTimeArrive = (date, dur) => {
    const parseDate = parseFullDate(date)
    const fullDate = new Date(
        Number(parseDate.year),
        Number(parseDate.month-1),
        Number(parseDate.date),
        Number(parseDate.hour),
        Number(parseDate.minutes)
    )
    const arriveDateMS = fullDate.getTime() + dur * 60000
    fullDate.setTime(arriveDateMS)
    return `${String(fullDate.getHours()).length === 1 ? "0" + fullDate.getHours(): fullDate.getHours()}:${String(fullDate.getMinutes()).length === 1 ? "0" + fullDate.getMinutes(): fullDate.getMinutes()}`
}

export const formatDuration = dur => {
    let [hour, minute] = String((dur/60).toFixed(2)).split(".")
    if (minute > 59) {
        hour = Number(hour) + 1
        minute = Number(minute) - 60
    }
    return `${hour}ч ${minute}м`
}
