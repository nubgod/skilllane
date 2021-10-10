
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App, { LoginApp } from './App';
import reportWebVitals from './reportWebVitals';
import initState from './utils/init-state'

const root = () => document.getElementById('root')

const loadState = async () => {
  const state = await initState()
  console.log(localStorage.getItem('auth'), "loggg")
  console.log(state, "STATE")
  if (localStorage.getItem('auth')) {
    ReactDOM.render(<App authed={true}  />, root())
    return true
  }
  // window.location.hash = 'login'
  ReactDOM.render(<LoginApp />, root())
}

loadState()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
