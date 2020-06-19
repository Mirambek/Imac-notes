import * as types from "../types/types";
import {CURRENT_NOTES_STATE_CHANGE} from "../actions/actionTypes"


export default function currentNoteReducer(state:any={}, action:any) {
  switch (action.type) {
      case CURRENT_NOTES_STATE_CHANGE:
        return action.currentNote;
      default:
        return state;
  }
}