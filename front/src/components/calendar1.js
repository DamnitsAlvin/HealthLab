import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";


const locales = {
    'en-US': require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format, 
    parse, 
    startOfWeek,
    getDay, 
    locales
})

const events = [
    {
        title: "Big Meeting", 
        all: true, 
        start: new Date(2022, 6, 0), 
        end: new Date(2022, 6,0)
    },
    {
        title: "Vacation", 
        all: true, 
        start: new Date(2022, 0, 0), 
        end: new Date(2022, 1,15)
    },
    {
        title: "Conference", 
        all: true, 
        start: new Date(2022, 6, 0), 
        end: new Date(2022, 6,0)
    },
    {
        title: "Meeting", 
        all: true, 
        start: new Date(2022, 6, 0), 
        end: new Date(2022, 6,0)
    },
]

export default function Kalendaryo(){
    const [newEvent, setNewEvent] = useState({
        title:"", 
        start:"", 
        end: ""
    })
    const [allEvents, setAllEvents] = useState(events)

    function handleAddEvents(){
        setAllEvents([...allEvents, newEvent])
    }
    function MaisipangIadd(){
       
            // <h2>Add new event</h2>
            // <div>
            //     <input type="text" 
            //     placeholder="Add Title" 
            //     style={{width:"20%", marginRight:"10px"}}
            //     value={newEvent.title} 
            //     onChange={(e)=>setNewEvent({...newEvent, title: e.target.value}) }/>
            //     <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
            //     selected={newEvent.start} onChange={(start)=> setNewEvent({...newEvent, start})}/>
            //     <DatePicker placeholderText="End Date" 
            //     selected={newEvent.end} onChange={(end)=> setNewEvent({...newEvent, end})}/>
            //     <button style={{margin:"10px"}} onClick={handleAddEvents}>Add Event</button>
            // </div>
        
    }
    return(
        <div className="centerContainer">
            <h1>Calendar</h1>
         
            <Calendar localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end"
            style={{height: 500, margin:"50px"}}></Calendar>
        </div>
    )
}