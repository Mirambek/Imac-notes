import * as types from "./actionTypes";
import { Note, CurrentNote } from "../../model/note";
import { noteService } from "../../services/notes-app.services";

export function loadNotesSuccess(notes:Note[]) {
    return { type: types.LOAD_NOTES_SUCCESS, notes };
  }
  export function currentNoteStateChanges(currentNote:CurrentNote) {
    return { type: types.CURRENT_NOTES_STATE_CHANGE, currentNote };
  }
  export function currentNoteUpdate(currentNote:Note) {
    return { type: types.UPDATE_CURRENT_NOTE,  notes:[currentNote] };
  }
  export function currentNoteDeleteState(currentNote:Note) {
    return { type: types.DElET_CURRENT_NOTE,  notes:[currentNote] };
  }
  
  export function addNoteSuccess(note:Note) {
    return { type: types.ADD_NOTES_SUCCESS, notes:[note] };
  }  
  export function loadNotes() {
    return function(dispatch:any) {
      return noteService
        .getLoadNotes()
        .then((notes:Note[]) => {
          dispatch(loadNotesSuccess(notes));
        })
        .catch((error:any) => {
          throw error;
        });
    };
  }
  
  export function addNote(n:Note) {
    return function(dispatch:any) {
      return noteService
        .add(n)
        .then(result => {
          dispatch(addNoteSuccess(result));
          changeCurrentNote(result,true)(dispatch);
        })
        .catch(error => {
          throw error;
        });
    };
  }

  export function seedNotes() {
    return (dispatch:any)=>noteService.seedDb(() =>(async ()=>{
                                                  await loadNotes()(dispatch);
                                                  let notes=await noteService.getLoadNotes();
                                                  if (notes && notes.length>0)
                                                    changeCurrentNote(notes[0],false)(dispatch);
                                                })());
  }
  
  export function deleteCurrentNote(note:Note,isEditing:boolean=false){
    return (dispatch:any)=>noteService.deleteNote(note).then(
      ()=>{
        dispatch(currentNoteDeleteState(note))
      }
    );  
  }
  export function changeCurrentNote(note:Note,isEditing:boolean=false){
    return (dispatch:any) =>dispatch(currentNoteStateChanges({isEditing,note}))  
  }

  export function saveCurrentNote(note:Note,isEditing:boolean=false){   
    console.log(note);    
    return (dispatch:any) =>noteService.updateNote(note).then(()=>dispatch(currentNoteUpdate(note)));  
  }
  