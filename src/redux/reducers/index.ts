import { combineReducers } from "redux";
import notes  from "./noteReducer";
import currentNote from "./currentNodeReducer"

const rootReducer = combineReducers({
    notes,
    currentNote
});

export default rootReducer;
