import React from "react";

export const Test = ()=>{
    return(
        <h1>hello</h1>
    )
}
export const Website = (props)=>{
    return(
        <h1 onClick={()=>alert('hello')}>helo my name is {props.name} {props.age}</h1>
    )
}

export default Website