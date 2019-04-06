import React,{useEffect,useState} from 'react';
import './event.css';
import {apolloFetch,bookEvent,cancelBook} from '../../queries/queries';

const Event=(props)=>{
    const [data,editor]=useState(props.details);
    const [auth,autheditor]=useState(localStorage.getItem("token"));
    const [Followed,folowededitor]=useState(false)

    const book=()=>{
        return apolloFetch({query:bookEvent(data._id,["_id"]),auth})
        .then(re=>folowededitor(true)
        )
    };

    const cancelbook=()=>{
        return apolloFetch({query:cancelBook(data._id,["_id"]),auth})
        .then(re=>folowededitor(false)
        )
    };

    useEffect(()=>{
        if(data.participant){
            const isIn= data.participant.filter(re=>re._id===localStorage.getItem("userId"));
            return isIn.length>0?folowededitor(true):folowededitor(false)   
        }
    },[Followed])

    return (
        <div className="div_event">
        <div className="event_base">
                <button className="btn-event" disabled={auth?false:true} onClick={Followed?cancelbook:book}>{Followed?"Cancel Attending":"Attend"}</button>
                <a href={`mailto:${data.creator[0].email}?Subject=Event:%20${data.title}`} target="_top" ><button className="btn-event">contact</button></a>
            </div>
            <h3 className="title">{data.title}</h3>
            <p className="description">
            {data.description}
            </p>
                <small ><strong>Date: </strong>{new Date(data.date).toDateString()}<strong> price: </strong> {data.price} €</small>
        </div>
    )
};


export default Event;