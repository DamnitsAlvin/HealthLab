import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import {format, getDay, parse, startOfWeek  } from "date-fns";
import { Calendar, dateFnsLocalizer, Navigate } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAppointments } from "../actions/userActions"
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
=======
import {useNavigate} from 'react-router-dom'
>>>>>>> origin/master

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

// const events = [
//     //January start in 0 
//     {
//         id: 0, 
//         title: "Big Meeting", 
//         start: new Date(2022,5,16, 9, 30),    //2022-June-0 or 2022-jan-6
//         end: new Date(2022,5,16, 10,0)
//     },
//     {
//         id: 1, 
//         title: "Vacation", 
//         all: true, 
//         start: new Date(2022, 0, 1), 
//         end: new Date(2022, 0, 15)       
//     },
//     {
//         id: 2, 
//         title: "Conference", 
//         allDay: true, 
//         start: new Date(2022, 6, 10), 
//         end: new Date(2022, 6, 10)
//     },
//     {
//         id: 3, 
//         title: "Meeting", 
//         all: true, 
//         start: new Date(2022, 6, 20), 
//         end: new Date(2022, 6, 20)
//     },
// ]

export default function Kalendaryo(props){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getAppoint = useSelector(x => x.userAppointment)
    const {appointments, message } = getAppoint

    const getUser = useSelector(x => x.userSignIn)
    const { userInfo } = getUser

    
    const [allEvents, setAllEvents] = useState([])

    useEffect(()=>{
        if(appointments){
            setAllEvents(parseDate())
        }
    }, [appointments])

    useEffect(() => {
        dispatch(getAppointments(userInfo.data[0], userInfo.data[2]))
    }, [dispatch])

    const parseDate = () =>{
        const allEvents = []

        //parse all dates
        console.log(userInfo.data[2])
        if(userInfo.data[2] == 'user'){
            if(appointments && appointments.Appointments){

                for(var i=0; i<appointments.Appointments.length; i++){
                    const date = appointments.Appointments[i][3].split("-")

                    console.log(date)
                    var month, year; 

                    if(parseInt(date[1])-1 == -1) { 
                        month = 11
                        year = parseInt(date[0]) - 1
                    }
                    else{
                        month = parseInt(date[1]) - 1 
                        year = parseInt( date[0] )
                    }

                    const newdate = new Date(year, month, parseInt(date[2])) 
                    const evt = {
                        title: appointments.Appointments[i][0], 
                        start: newdate, 
                        end:  newdate  
                    }
                    allEvents.push(evt)
                }
            }
            
        }
        //parse only accepted dates
        else{
            if(appointments && appointments.Appointments){
                for(let i=0; i<appointments.Appointments.length; i++){
                    if(appointments.Appointments[i][5]=="Accepted"){
                        const date = appointments.Appointments[i][3].split("-")

                        console.log(date)
                        var month, year; 
    
                        if(parseInt(date[1])-1 == -1) { 
                            month = 11
                            year = parseInt(date[0]) - 1
                        }
                        else{
                            month = parseInt(date[1]) - 1 
                            year = parseInt( date[0] )
                        }
    
                        const newdate = new Date(year, month, parseInt(date[2])) 
                        const evt = {
                            title: appointments.Appointments[i][0], 
                            start: newdate, 
                            end:  newdate  
                        }
                        allEvents.push(evt)
                    }
                  
                }
            }
        }
        console.log(allEvents)
        return allEvents
    }




  
    console.log(allEvents)
   
    function MaisipangIadd(){
            // const [newEvent, setNewEvent] = useState({
            //     title:"", 
            //     start:"", 
            //     end: ""
            // })

            // function handleAddEvents(){
            //     setAllEvents([...allEvents, newEvent])
            // }  
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
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="CalendarContainer">
            <div className="CalendarMain">

            <Calendar 
            localizer={localizer} 
            events={allEvents} 
            startAccessor="start" 
            endAccessor="end"
            style={{height: 700, margin:"40px"}}>

            </Calendar>
            <div><button type="button" className="btn btn-primary"id="calendarButton" onClick={()=>navigate("/appointments")}>View Appointment Table</button></div>
          
        </div>
        
        </div>
        
        </div>
    )
}