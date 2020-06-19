import React,{useState} from 'react';
import { Layout } from 'antd';
import SideBar from './components/side-bar';
import IMacHeader from './components/header';
import RightContent from './components/right-content';
import './App.css';
import "antd/dist/antd.css";

const { Header, Content, Footer } = Layout;


function App() { 
  return (
    <div >
    <IMacHeader />
    <Layout className="site-layout" style={{ minHeight: '95vh' }}>      
      <SideBar/>
    <Layout >
    <RightContent/>
    </Layout>
  </Layout>
  </div>
    );
}

export default App;