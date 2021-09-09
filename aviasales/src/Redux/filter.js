import {CHANGE_FILTER} from "./actionType";

const changeFilterAction = (filterParams, filterTickets) => {
    return {
        type: CHANGE_FILTER,
        filterParams,
        filterTickets
    }
}

const changeVisibleTickets = (tickets, value) => {
    tickets.forEach(t=>{
        delete t['unvisible']
        if (t.segments[0].stops.length !== value && t.segments[1].stops.length !== value) {
            t.unvisible = true
        }
    })
}

export const changeFilter = index => {
    return (dispatch, getState) => {
        const filterParams = [...getState().filterReducer.filterParams]
        let tickets = [...getState().ticketsReducer.tickets]
        filterParams.forEach(p => {
            p.checked = false
        })
        filterParams[index].checked = true
        if (index) {
            changeVisibleTickets(tickets,index-1)
        } else {
            tickets.forEach(t=>{
                delete t['unvisible']
            })
        }
        dispatch(changeFilterAction(filterParams, tickets))
    }
}