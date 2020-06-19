import * as types from "../types/types";
import {
  LOAD_NOTES_SUCCESS,
  UPDATE_CURRENT_NOTE,
  ADD_NOTES_SUCCESS,
  DElET_CURRENT_NOTE,
} from "../actions/actionTypes";
import { Note } from "../../model/note";

export default function noteReducer(state: Note[] = [], action: types.Action) {
  switch (action.type) {
    case LOAD_NOTES_SUCCESS:
      return action.notes;
    case UPDATE_CURRENT_NOTE:
      return state.map((v) => {
        if (
          action.notes &&
          action.notes.length > 0 &&
          action.notes[0].id === v.id
        )
          return action.notes[0];
        else return v;
      });
    case DElET_CURRENT_NOTE:      
      return state.filter((v) => 
          action.notes[0]?.note?.id !== v.id        
          );
    case ADD_NOTES_SUCCESS:
      if (action.notes && action.notes.length > 0)
        return [...state, ...action.notes];
      return state;
    default:
      return state;
  }
}
