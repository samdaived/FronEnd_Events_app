import React,{useState,useEffect} from 'react';
import Event from '../../components/event/event';
import './allevent.css';
import Modal from '../../components/modal/modal';
import {allEvent,apolloFetch} from '../../queries/queries';

const AllEvents=(props)=>{
    const [modal,modalEditor]=useState(false);
    const [events,eventsEditor]=useState([]);
    const [refresh,refreshEditor]=useState(false);

    const refreshPage=()=>{
        refreshEditor(!refresh)
    }

    const modalHandler=()=>{
        refreshEditor(!refresh)
        return modalEditor(!modal);
    }
    const fetchEvents=()=>{
        return apolloFetch({query:allEvent(10,["title,description,price,date,_id,creator{email},participant{_id}"])})
            .then(res=>eventsEditor(res.data.event)).catch(er=>console.log(er)
            )
    }
    useEffect(()=>{
        fetchEvents()
    },[refresh])

    return (
        <React.Fragment>
                {props.auth&&<button className="btn btn_modal" onClick={modalHandler}>Create Event</button>}
                <Modal handler={modalHandler} token={props.auth} showHide={modal}/>
                <div className={modal?"all_div lock_scroll":"all_div"}>
        {events?Object.values(events).map(ev=>{return <Event key={ev._id} details={ev}/>}):<h1>No events yet</h1>}
            </div>
        </React.Fragment>

    )
}


export default AllEvents;