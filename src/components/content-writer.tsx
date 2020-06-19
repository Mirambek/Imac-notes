import marked from "marked";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import {changeCurrentNote,saveCurrentNote} from '../redux/actions/notesAction'
import { connect } from "react-redux";
import SimpleMDE from "simplemde";
import 'simplemde/dist/simplemde.min.css'
import { CurrentNote, Note } from "../model/note";

import React, { Component, ReactNode } from 'react'

interface Props {}
interface State {}

class ContentWriter extends Component<any,{}>{
  event: any={};
  
  componentDidUpdate(){
    console.log(this.props.currentNote)
    if (this.simpleMDEObj && this.props.currentNote && this.props.currentNote.note){      
      this.simpleMDEObj.value(this.props.currentNote.note.text);      
    }
  }
  simpleMDEElement: any=undefined;
  simpleMDEObj:any;
  componentDidMount(){  
    this.simpleMDEObj=new SimpleMDE({
      element: this.simpleMDEElement,      
      autofocus: true,           
    });
    const changeSimpleMde=(val:string)=>{
      let note:Note= this.props.currentNote.note;
      this.props.saveCurrentNote({...note,text:val})
    }
    this.event=eventRegisterSimpleMDe(changeSimpleMde,this.simpleMDEObj,this.simpleMDEElement);   
  }
componentWillUnmount(){
  this.event.removeEvents();
}
  
  constructor(props: Props) {
    super(props)    
    
    this.state = {
      
    }
  }

  render(): ReactNode {
    return (
      
    <textarea
    ref={(e: HTMLTextAreaElement) => {
      this.simpleMDEElement = e;
    }}
  />
    )
  }
}

function mapStateToProps(state:any) {
  console.log(state)
  return {
    currentNote:
      state.currentNote
  };
}

function mapDispatchToProps(dispatch:any) {
  return {          
      changeCurrentNote:bindActionCreators(changeCurrentNote, dispatch),
      saveCurrentNote:bindActionCreators(saveCurrentNote, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentWriter);

function eventRegisterSimpleMDe(onChange:any,simpleMde:any,elWRef:any){
  let edEl:any;
  let edTlbr:any;
  if (elWRef && simpleMde) {
    edEl = elWRef;
    edTlbr = elWRef.getElementsByClassName(
    "editor-toolbar"
    )[0];
  }
  let eventWrapper:any = () => {    
    onChange(simpleMde!.value());
  };
  let addEvents:any = () => {  
    edEl.addEventListener("keyup", eventWrapper);
    edEl.addEventListener("paste", eventWrapper);
    edTlbr &&
      edTlbr.addEventListener("click", eventWrapper);

    simpleMde.codemirror.on("change", eventWrapper);
  };
  addEvents();
  let removeEvents:any = () => {
    if (edEl && edTlbr) {
      edEl.removeEventListener("keyup", eventWrapper);
      edEl.removeEventListener("paste", eventWrapper);
      edTlbr.removeEventListener("click", eventWrapper);
    }
  };
  

  return {
    removeEvents    
  }
}