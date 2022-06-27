import React, {Component} from 'react'
import Helmet from "react-helmet";

export default class Calendar extends Component{
    constructor(props){
        super(props)
        this.state = {
            myExternalLib: null
        };

        this.handleScriptInject = this.handleScriptInject.bind(this);
    }

    handleScriptInject({ scriptTags }) {
        if (scriptTags) {
            const scriptTag = scriptTags[0];
            scriptTag.onload = () => {
                // I don't really like referencing window.
                console.log(`myExternalLib loaded!`, window.myExternalLib);
                this.setState({
                    myExternalLib: window.myExternalLib
                });
            };
        }
    }

    componentDidUpdate(){
      
      var calendarEl = document.getElementById('calendar');
      var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
      height: 'parent',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth'
      },
      defaultView: 'dayGridMonth',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2020-02-01',
        },
        {
          title: 'Long Event',
          start: '2020-02-07',
          end: '2020-02-10'
        },
        {
          title: 'Conference',
          start: '2020-02-11',
          end: '2020-02-13'
        }
      ]
    });

    calendar.render();
    }

    render(){
        return(
            <>
            <Helmet
                script={[{ src: "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.js" }]}
                // Helmet doesn't support `onload` in script objects so we have to hack in our own
                onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
            />
            {this.state.myExternalLib !== null ?
                 (
                <div className="centerContainer ">
                 <div id='calendar-container'>
                    <h1>Fullcalendar 4 Example - Nicesnippets.com</h1>
                    <div id='calendar'></div>
                </div>
                </div>
                ) :
                <></>
            
            }
           
            </>
        )
    }
}