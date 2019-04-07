import React,{useState} from 'react';
import './modal.css';
import {apolloFetch,createEvent} from '../../queries/queries';
import {notEmpty} from '../../helpers/validator';
import {AlertHandler} from '../../helpers/alert';


const Modal =(props)=>{
    const [title,titleEditor]=useState("");
    const [describe,describeEditor]=useState("");
    const [price,priceEditor]=useState("");
    const [date,dateEditor]=useState("");

    const inputHandler=(e,v)=>{
        e.preventDefault();
        // constructing function name
        const name=v+"Editor";
        // converting to function
        const fun=eval(`${name}`);
        // calling the function
        fun(e.target.value)       
    }

    // create new event
    const create=(e)=>{
        e.preventDefault();
        if(notEmpty(title)&&notEmpty(describe)&&notEmpty(price)&&notEmpty(date)){
            return apolloFetch({query:createEvent(title,describe,date,price,["title"]),auth:props.token})
            .then(re=>{
                AlertHandler(re);
                return props.handler()}
            ).catch(er=>alert(er)
            )
        }else{
            alert("Please fill all the fields")
        } }

    return <React.Fragment>
                {props.showHide&&<React.Fragment>
                
                    <div className="bd" onClick={()=>props.handler()}></div>
                    <form className="modal_body" onSubmit={create}>
                        <button className="btn-close" onClick={props.handler}>&#10006;</button>
                        <div >
                            <label>Title</label>
                            <input type="text" autoComplete="off" value={title} placeholder="Title of your event" onChange={(e)=>inputHandler(e,"title")}/>
                        </div>
                        <div >
                            <label>Description</label>
                            <textarea className="text_area" rows="4" cols="50" placeholder="describe a bit about it" value={describe} onChange={(e)=>inputHandler(e,"describe")}/>
                        </div>
                        <div >
                            <label>Date</label>
                            <input type="datetime-local" autoComplete="off" value={date} onChange={(e)=>inputHandler(e,"date")}/>
                        </div>
                        <div >
                            <label>Price</label>
                            <input type="number" autoComplete="off" placeholder="by euro,Put 0 if it is free" value={price} onChange={(e)=>inputHandler(e,"price")}/>
                        </div>
                        <button className="btn_modal" onClick={create} >Create</button>
                    </form>
                </React.Fragment>}
            </React.Fragment>
                    
                }

export default Modal;