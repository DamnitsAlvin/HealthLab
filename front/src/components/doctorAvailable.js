import React from "react";




export default function DoctorAvailable(props){
    const {mode, data} = props

    return(
        <>
            {mode=="Online" ? (
                <div className="docAvailOnline">
                    <p>{mode} : </p>
                    <p>{data[2]} {data[2]==data[3] ? "" : `- ${data[3]}`}</p>
                    <p>{`${data[4]} - ${data[5]}`}</p>
                </div>
            ) : (
                
                    <div className="docAvailOnline">
                        <p>{mode} : </p>
                        <p>{data[3]} {data[3]==data[4] ? "" : `- ${data[4]}`}</p>
                        <p>{`${data[5]} - ${data[6]}`}</p>
                    </div>

            )}
          


            
        </>
    )
}