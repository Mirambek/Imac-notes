import React, { useState } from "react";
import { Layout, Breadcrumb } from "antd";
import ContenReader from "./content-reader"
import ContentWriter from "./content-writer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {changeCurrentNote} from '../redux/actions/notesAction'
import { CurrentNote } from "../model/note";
const { Header, Content } = Layout;
function RightContent({currentNote}:{currentNote:CurrentNote}) {
  return (
    <>
      
      <Content style={{ padding: "0 16px",backgroundColor:'#fafaf8' }}>
      <h2 style={{padding:'1rem',textAlign:'center'}}>{currentNote?.note?.title}</h2>        
           <div style={{display:currentNote && currentNote.isEditing?'block':'none'}}> <ContentWriter /></div>  
           <div style={{display:(!currentNote || !currentNote.isEditing)?'block':'none'}}>
             <ContenReader /></div>        
      </Content>
    </>
  );
}


function mapStateToProps(state:any) {
  console.log(state)
  return {
    currentNote:
      state.currentNote
  };
}


export default connect(
  mapStateToProps
  
)(RightContent);
