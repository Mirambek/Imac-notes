import { db } from "../db/imac-notes-db";
import { Note } from "../model/note";

export class NoteService {
  updateNote(note: Note) {
    return db.notes.update(note.id || -1,{text:note.text});
  }
  getLoadNotes =()=> db.notes.toArray();
    
  

  async seedDb(loadNotes:Function) {
    // await Promise.all([db.notes.clear()]);
    await db.transaction("rw", db.notes, async function () {
      if (await db.notes.count()<=0){
          await db.notes.bulkAdd([{text: "11111", title: "dsds" },{text: "22222", title: "zzzz" }]);        
      }
      loadNotes()
    });
  }
  public add(note: Note): Promise<Note> {
    return db.notes.add(note).then(
      (n: number): Note => {
        return { ...note, id: n };
      }
    );
  }
  deleteNote(note: Note): Promise<any> {
    return db.notes.delete(note.id || 0);
  }
}

export var noteService = new NoteService();
