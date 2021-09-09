import cls from "../App.module.css";
import {CHANGE_FILTER, CHANGE_SORT, LOAD_TICKETS, SET_ERRMES, SET_SEARCHID, SET_TICKETS} from "./actionType";

const initialState = {
    searchId: null,
    errMes: null,
    allTickets: null,
    tickets: null,
    sortParamsClass: {
        price: cls.active,
        duration: null
    },
    sortParam: 'price'
}

export default function ticketsReducer(state=initialState, action) {
    switch (action.type) {
        case SET_SEARCHID:
            return {
                ...state,
                searchId: action.searchId
            }
        case SET_ERRMES:
            return {
                ...state,
                errMes: action.errMes
            }
        case SET_TICKETS:
            return {
                ...state,
                allTickets: action.allTickets,
                tickets: action.tickets
            }
        case CHANGE_SORT:
            return {
                ...state,
                sortParam: action.sortParam,
                sortParamsClass: action.sortParamsClass,
                tickets: action.tickets
            }
        case LOAD_TICKETS:
            return {
                ...state,
                tickets: action.tickets
            }
        case CHANGE_FILTER:
            return {
                ...state,
                tickets: action.filterTickets
            }
        default:
            return state
    }
}