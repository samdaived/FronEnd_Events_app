import React,{useEffect,useState} from 'react';
import './event.css';
import {CheckIfItHas} from '../../helpers/chechIdIn';

// queries  a nice helper to conserve the code and make it clear
import {apolloFetch,bookEvent,cancelBook,deleteEvent} from '../../queries/queries';
import {AlertHandler} from '../../helpers/alert';


const Event=(props)=>{
    const data=props.details;
    const auth=localStorage.getItem("token");
    const [Followed,folowededitor]=useState(CheckIfItHas(data.participant));
    const creator=CheckIfItHas(data.creator);

    //booking one event
    const book=()=>{
        return apolloFetch({query:bookEvent(data._id,["_id"]),auth})
        .then(re=>{
            AlertHandler(re);
            props.re();
            return folowededitor(true)})
        .catch(er=>alert(er))
    };

    //delet one event
    const delet=()=>{
        return apolloFetch({query:deleteEvent(data._id,["_id"]),auth})
        .then(re=>{
            AlertHandler(re);
            setTimeout(() => {
            props.re()
        }, 500);})
        .catch(er=>alert(er))
    };

        // to cancel one booking
    const cancelbook=()=>{
        return apolloFetch({query:cancelBook(data._id,["_id"]),auth})
        .then(re=>{
            AlertHandler(re);
            props.re();
            return folowededitor(false)
        }
        )
        .catch(er=>alert(er))
    };

    return (
        <div className="div_event">
                {creator?<button onClick={delet} className="btn-event_close" >Remove</button>:null}
                <h3 className="title">{data.title}</h3>
            <div className="description">
                <p >
                {data.description}
                </p>
            </div>
                <small ><strong>Date: </strong>{data.date?new Date(parseInt(data.date)).toUTCString():null}<br/><strong> price: </strong> {data.price} €</small>
            <div className="event_base">
                <button className="btn-event" disabled={auth?false:true} onClick={Followed?cancelbook:book}>{Followed?"Cancel Attending":"Attend"}</button>
                <a href={`mailto:${data.creator[0].email}?Subject=Event:%20${data.title}`} target="_top" ><button className="btn-event">contact</button></a>
            </div>
        </div>
    )
};


export default Event;