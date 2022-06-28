import React from 'react'

export default function SorryPage(){
 
    return(
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="centerContainerVin">
            <div className="success">
                <div className="imagehandler gg">
                    <img src="./img/svg icons/cancel-mark.png"/>
                </div>
                <div className="successVin">
                    The doctor/user has currently reach the limit for the number of appointments they can do
                      <br/>
                      <a href="/appointments"><span className="pogi">Go to appointments</span></a> <br/>
              
                </div>
            </div>
        </div>
        </div>
    )

}