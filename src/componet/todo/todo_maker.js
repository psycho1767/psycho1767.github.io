import React from "react";
import "./todo.css"

function Todo_maker(parms){
        function changemycolor(e){
                document.getElementById("todo_check").classList.toggle("pup")
                document.getElementById('tick').classList.toggle('whi')
        }
        return(
                <div className="todo">
                        <div className="todo_info" >
                                <div className="todo_check" id="todo_check" onClick={changemycolor}>
                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path className="nowhi" id="tick" d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"/></svg> 
                                </div>
                                <div className="todo_little">
                                        <div className="todo_name">todoname</div>
                                        <div className="todo_date">8:30 14/14/14</div>
                                </div>
                        </div>
                        <div className="todobtns">
                                <button>test1</button>
                                <button>test2</button>
                        </div>
              </div>
        )
}


export default Todo_maker;