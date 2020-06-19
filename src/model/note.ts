export interface  Note {
    id?: number;
    title: string;
    text: string;        
    }
export interface CurrentNote
{
    isEditing?:boolean;
    note:Note;
    
}