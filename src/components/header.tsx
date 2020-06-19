import React, { useState } from "react";
import { Layout, Modal, Button, Tooltip } from "antd";
import { DeleteOutlined,FormOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {changeCurrentNote,deleteCurrentNote} from '../redux/actions/notesAction'
import { CurrentNote } from "../model/note";

const { Header } = Layout;

function IMacHeader({currentNote,changeCurrentNote,deleteCurrentNote}:{currentNote:CurrentNote,changeCurrentNote:any,deleteCurrentNote:any}) {
  const [visible,setVisible]= useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = (yes:boolean) => {    
    setVisible(false);
    if (yes)
      deleteCurrentNote(currentNote);      
  };

  return (
    <Header className="toolbar-header" >      
      <Tooltip title="Изменить">
          <Button icon={<FormOutlined />} onClick={()=>{
                                                        if (currentNote && currentNote.note) 
                                                        {  
                                                          changeCurrentNote(currentNote.note,true);
                                                          console.log(currentNote);
                                                        }
                                                      }}></Button> 
      </Tooltip>
      <Tooltip title="Удалить">
          <Button icon={<DeleteOutlined />} onClick={showModal}></Button> 
      </Tooltip>      
      <Modal
          title="Modal"
          visible={visible}
          onOk={()=>hideModal(true)}
          onCancel={()=>hideModal(false)}
          okText="Да"
          cancelText="Отмена"
        >
          <p>Подтвердите удаление?</p>          
        </Modal>
    </Header>
  );
}


function mapStateToProps(state:any) {
  return {
    currentNote:state.currentNote 
  };
}
function mapDispatchToProps(dispatch:any) {
  return {          
      changeCurrentNote:bindActionCreators(changeCurrentNote, dispatch),
      deleteCurrentNote:bindActionCreators(deleteCurrentNote, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IMacHeader);

