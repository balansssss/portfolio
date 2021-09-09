import {combineReducers} from "redux";
import filterReducer from "./filterReducer";
import ticketsReducer from "./ticketsReducer";

export default combineReducers({
    filterReducer,
    ticketsReducer
})