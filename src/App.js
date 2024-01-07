import React, { useState } from 'react';
import TODO_MAKER from './componet/todo/todo_maker';
import './App.css';

function App() {
  const[todolist,settodolist] = useState(Array())
  function closebtn(e) {
    const fscreen = document.getElementById('fsc');
    const continer = document.getElementById('fcontiner');
    fscreen.classList.remove('fscreen')
    continer.classList.remove('fcon')
    setTimeout(() => {
      fscreen.classList.add('rfscreen');
      continer.classList.add('rfcon');
    }, 100)
    setTimeout(()=>{
      fscreen.classList.add('hidden');
      continer.classList.add('hidden');
    },400)
    
  }
  function addtaskslider(e){
    const fscreen = document.getElementById('fsc');
    const continer = document.getElementById('fcontiner');
    fscreen.classList.remove('hidden')
    continer.classList.remove('hidden')
    fscreen.classList.remove('rfscreen');
    continer.classList.remove('rfcon');
    fscreen.classList.add('fscreen')
    continer.classList.add('fcon')
  }
  function addtask(){
    const title = document.getElementById('title');
    const status = document.getElementById('status');
    taskmaker(title.value,status.value)
    closebtn()
  }
  function taskmaker(title,status){
    const todoMaker = <TODO_MAKER title={title} status={status} />
    settodolist(prevList => prevList.concat(todoMaker));
  }
  return(
    <div>
      <div id='root'>
        <div id='continer'>
          <p>Psycho TODO LIST</p>
          <div id="mainapp">
            <div id='frow'>
              <button id='addbtn' className='btn' onClick={addtaskslider}>add Task</button>
              <select id='fselect'>
                <option value="all">All</option>
                <option value="incompelet">incompelet</option>
                <option value="compeleted">compeleted</option>
              </select>
            </div>
            <div id="srow">
              <div id="notodo" className='hidden'>No Todos</div>
              <TODO_MAKER title='test1' status="test2"/>
              {todolist.map((todo)=>todo)}
            </div>
          </div>
        </div>
      </div>
      <div id='fsc' className='fscreen hidden'>
        <div id='fcontiner' className='fcon hidden'>
          <button id="close" onClick={closebtn}>
            <svg className='closeico' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z"/></svg>          
          </button>
          <div id="addbox">
              <h1>Add TODO</h1>
              <label htmlFor="title">
                title
                <input type="text" id='title'/>
              </label>
              <label>
                status
                <select id='status'>
                  <option value="incompelet">incompelet</option>
                  <option value="compeleted">compeleted</option>
                </select>
              </label>
              <div className="btns">
              <button className='btn' id='AddTask' onClick={addtask}>Add task</button>
              <button className='btn cancelbtn' id='cancel' onClick={closebtn}>cancel</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
