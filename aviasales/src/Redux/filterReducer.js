import {CHANGE_FILTER} from "./actionType";

const initialState = {
    filterParams: [
        {
            id: 'filterAll',
            checked: true,
            label: 'Все'
        },
        {
            id: 'filterNotransfer',
            checked: false,
            label: 'Без пересадок'
        },
        {
            id: 'filterOnetransfer',
            checked: false,
            label: '1 пересадка'
        },
        {
            id: 'filterTwotransfer',
            checked: false,
            label: '2 пересадки'
        },
        {
            id: 'filterThreetransfer',
            checked: false,
            label: '3 пересадки'
        }
    ]
}

export default function filterReducer(state=initialState, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return {
                ...state,
                filterParams: action.filterParams
            }
        default:
            return state
    }
}