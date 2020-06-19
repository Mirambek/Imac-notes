﻿import Dexie from 'dexie';
import { Note } from '../model/note';

export class AppDatabase extends Dexie {

    notes: Dexie.Table<Note, number>;

    constructor() {

        super("NoteDatabase");
        console.log("NoteDb constructor called");
        var db = this;

        db.version(1).stores({
            notes: '++id, title, text'            
        });

        this.notes=this.table("notes");
    }
}



export var db = new AppDatabase();