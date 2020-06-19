import marked from 'marked';
import React,{useState} from 'react';
import { connect } from "react-redux";
import { CurrentNote } from '../model/note';


function ContentReader({currentNote}:{currentNote:CurrentNote}){    
    return(
        <div>
            
            <div dangerouslySetInnerHTML={{__html: marked(currentNote?.note?.text || '')}} />
        </div>
    );
}


function mapStateToProps(state:any) {
    return {
      currentNote:
        state.currentNote
    };
  }
  
  
  export default connect(
    mapStateToProps    
  )(ContentReader);