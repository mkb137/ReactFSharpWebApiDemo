import style from '../css/site.less'
import React from 'react'
import ReactDOM from 'react-dom'
//import BasicExample from './App'
import BasicExample from './AppTS'

function test() {
    console.log("test");
    ReactDOM.render(BasicExample(), document.getElementById('root'));
}

window.onload = test;