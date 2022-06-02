import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DoctorInformation } from "../actions/doctorActions";
import DoctorAvailable from "../components/doctorAvailable";

export default function Bookdoctor() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const getBasicDocInfo = useSelector((x)=>x.doctorBasicInformation)

    const {DocBasicInfo, loading, error} = getBasicDocInfo
    console.log("Doc Basic Infor: ", DocBasicInfo)
    useEffect(()=>{
        dispatch(DoctorInformation(id))
    },[dispatch, id])

    return(
        
    
    <div className="container">
        <div className="row gutters">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">
        <div className="pard h-100">
        
            <div className="card-body">
                <div className="account-settings">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
                        </div>
                        <h3 className="user-name">{DocBasicInfo && DocBasicInfo.BasicInfo[1].concat(" ", DocBasicInfo.BasicInfo[2], " ", DocBasicInfo.BasicInfo[3])}</h3>
                        <h4 className="user-name">{DocBasicInfo && DocBasicInfo.Titles}</h4>
                        <h6 className="user-email">{DocBasicInfo && DocBasicInfo.BasicInfo[7]}</h6>
                    </div>
                    <div className="about">
                        <h5>Education</h5>
                        {DocBasicInfo && (
                            <>
                                {DocBasicInfo.Education.map(educ => (
                                        <p>
                                            {educ[1]} <br/>
                                            {educ[2]} <br/>
                                            {educ[3]} <br/>
                                            {educ[5]}
                                        </p> 
                                ))}
                            </>
                        )}
                    </div>
                    {
                        DocBasicInfo ? ( DocBasicInfo.Certification ? (
                            <div className="about">
                                <h5>Certifications</h5>
                                {DocBasicInfo.Certification.map(cert =>(
                                    <p>
                                        {cert[1]}<br/>
                                        {cert[2]}
                                    </p>
                                ))}
                          </div>
                        ) : <></>) : <></>
                    }
                    
                    {
                        DocBasicInfo ? ( DocBasicInfo.Experience ? (
                            <div className="about">
                                <h5>Experience</h5>
                                {DocBasicInfo.Experience.map(exp =>(
                                    <p>
                                        {exp[1]}<br/>
                                        {exp[2]}<br/>
                                        {exp[4]}
                                    </p>
                                ))}
                          </div>
                        ) : <></>) : <></>
                    }   
                </div>
            </div>
        </div>
        </div>

        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
        <div className="pard h-100">
            <div className="card-body">
                <div className="row gutters">
                    <div className="doctop col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <h6 className="mb-2 text-primary">Mode of Consulation</h6>
                       
                        <div className={DocBasicInfo && (DocBasicInfo.BasicInfo[8]==0 ? '' : DocBasicInfo.BasicInfo[8]==2 ? '': 'mod') }><span><img className={DocBasicInfo && (DocBasicInfo.BasicInfo[8]==0 ? 'checkicona' : DocBasicInfo.BasicInfo[8]==2 ? 'checkicona': 'checkiconb') } src="/img/svg icons/checkmark-pngrepo-com.png"/></span>Virtual </div>
                        <div className={DocBasicInfo && (DocBasicInfo.BasicInfo[8]==1 ? '' : DocBasicInfo.BasicInfo[8]==2 ? '': 'mod') }><span><img className={DocBasicInfo && (DocBasicInfo.BasicInfo[8]==1 ? 'checkicona' : DocBasicInfo.BasicInfo[8]==2 ? 'checkicona': 'checkiconb')} src="/img/svg icons/checkmark-pngrepo-com.png"/></span>Face-to-Face</div>
                          
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <h6 className="mb-2 text-primary">Work Experience</h6>
                        <div><strong>{
                                DocBasicInfo ? (DocBasicInfo.Experience ? 
                                    DocBasicInfo.Experience.reduce((total, num)=>{
                                        return total + Math.round(num[3])
                                    },0) : <></>
                                    
                                    ) : <></>
                            
                            } years work experience</strong></div>
                    </div>
                    </div>

                    <div className="doctop col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <h6 className="mb-2 text-primary">Specialties</h6>
                        <div>
                            <ul>
                                {
                                    DocBasicInfo && DocBasicInfo.Specialty.map((spec, index)=>(
                                        <li key={index}>{spec[1]}</li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <h6 className="mb-2 text-primary">Sub-Specialties</h6>
                        <div>
                            <ul>
                                {
                                    DocBasicInfo && DocBasicInfo.Specialty.map((spec)=>(
                                        <li>{spec[2]}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    </div>


                </div>

                <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Available Dates </h6>
                        {DocBasicInfo ?(
                            DocBasicInfo.Available_Online ? 
                            (<div className="availOnline">
                                {DocBasicInfo.Available_Online.map(online=>(
                                    <DoctorAvailable mode="Online" data={online}/>
                                ))}
                            </div>)
                            : <></>
                            ) : <></> }

                         {DocBasicInfo ?(
                            DocBasicInfo.Available_Offline ? 
                            (<div>
                                {DocBasicInfo.Available_Offline.map(offline=>(
                                    <DoctorAvailable mode="Face to Face" data={offline}/>
                                ))}
                            </div>)
                            : <></>
                            ) : <></> }
                    </div>
                </div>
                
                
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Payment Information </h6>  
                        <ul>
                        {DocBasicInfo ? (DocBasicInfo.Payment ? (
                            DocBasicInfo.Payment.map(payment=>(
                                <li>{payment[1]}</li>
                            ))
                        ): <></>) : <> </>}
                        </ul> 
                        
                    </div>
                </div>

                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                           
                            <button type="button" id="submit" name="submit" className="btn btn-primary">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>

    );
}