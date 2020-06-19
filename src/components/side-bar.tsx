import React,{useState,useEffect} from 'react';
import { bindActionCreators } from "redux";
import {seedNotes,loadNotes,changeCurrentNote, addNote} from '../redux/actions/notesAction'
import { connect } from "react-redux";
import { Layout, Menu } from 'antd';

import {
  PlusCircleFilled
} from '@ant-design/icons';
import { Note, CurrentNote } from '../model/note';
const {  Sider } = Layout;



function IMacSidebar({seedNotes,notes,changeCurrentNote,addNote,currentNote}:{seedNotes:any,notes:Note[],
  changeCurrentNote:any,addNote:any,currentNote:CurrentNote}) {        
    useEffect(()=>{
      seedNotes();      
    },[]);
    useEffect(()=>{  
        setSelectedKey(currentNote?.note?.id + '');
    },[currentNote]);
    const [today]= useState(new Date())
    const [selectedKey,setSelectedKey]=useState('');
    
    return (  
    <Sider style={{backgroundColor: '#fafaf8',position:'relative'}}>      
      <Menu theme="light" selectedKeys={[''+selectedKey]} mode="inline">
        {
          notes?.map((v:Note)=>{
            return (
            <Menu.Item  key={v.id} onClick={()=>{setSelectedKey(''+v.id); changeCurrentNote(v);}}>
                <h3>{v.title +" " +v.id}</h3>
            <h5 style={{}}>{today.toDateString()}</h5> 
            </Menu.Item>
            )
          })        
        }
      </Menu>
      <div style={{position: 'absolute', 
                bottom: '3rem', paddingLeft:'1rem',cursor:'pointer' }} onClick={()=>{addNote({text:'',title:'Новая заметка 1'})}}>
                  <PlusCircleFilled/><span style={{paddingLeft:'0.6rem'}}>Новая заметка</span>
                </div>
    </Sider>
    );
}

function mapStateToProps(state:any) {
  return {
    notes:
      state.notes,
    currentNote:state.currentNote 
  };
}
function mapDispatchToProps(dispatch:any) {
  return {          
      loadNotes: bindActionCreators(loadNotes, dispatch),
      seedNotes:bindActionCreators(seedNotes, dispatch),
      changeCurrentNote:bindActionCreators(changeCurrentNote, dispatch),
      addNote:    bindActionCreators(addNote, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IMacSidebar);