import React,{useState,useEffect} from 'react';
import Event from '../../components/event/event';
import './allevent.css';
import Modal from '../../components/modal/modal';
import {allEvent,apolloFetch} from '../../queries/queries';
import { AlertHandler } from '../../helpers/alert';
import {CheckIfItHas} from '../../helpers/chechIdIn';

const AllEvents=(props)=>{

    const [modal,modalEditor]=useState(false);
    const [events,eventsEditor]=useState([]);
    const [myevents,myeventsEditor]=useState([]);
    const [refresh,refreshEditor]=useState(false);

        // forcing the page to refresh and refetch the data after adding or removing items
    const refreshPage=()=>{
       return refreshEditor(!refresh)
    }
    /// Showing and hiding the modal
    const modalHandler=()=>{
        refreshEditor(!refresh)
        return modalEditor(!modal);
    }

    // Fetching all the events
    const fetchEvents=async()=>{
        try{
            const response=await apolloFetch({query:allEvent(10,["title,description,price,date,_id,creator{email,_id},participant{_id}"])});
            AlertHandler(response);
            const resultFiltered =response.data.event.filter(el=>CheckIfItHas(el.creator)||CheckIfItHas(el.participant))
             const result=response.data.event;
            myeventsEditor(resultFiltered)
            return eventsEditor(result)

    }catch(er){
        console.log(er)}
    }


    useEffect(()=>{
        fetchEvents()
        // this will be repeated each time refresh value is changed
    },[refresh])

    return (
        <React.Fragment>
                {props.auth&&<button className="btn btn_modal" onClick={modalHandler}>Create Event</button>}
                <Modal handler={modalHandler} token={props.auth}  showHide={modal}/>
                <div className={modal?"all_div lock_scroll":"all_div"}>
        {events?Object.values(!props.JustMine?events:myevents).map(ev=>{return <Event re={refreshPage} key={ev._id} details={ev}/>}):<h1>No events yet</h1>}
            </div>
        </React.Fragment>
    )
}


export default AllEvents;