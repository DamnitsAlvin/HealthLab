import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DoctorInformation } from "../actions/doctorActions";
import DoctorAvailableOffline from "../components/doctor/doctorAvailableOffline";
import DoctorAvailableOnline from "../components/doctor/doctorAvailableOnline";
import DoctorCert from "../components/doctor/doctorCert";
import DoctorEduc from "../components/doctor/doctorEduc";
import DoctorExperience from "../components/doctor/doctorExperience";
import DoctorPayment from "../components/doctor/doctorPayment";
import DoctorPersonal from "../components/doctor/doctorPersonal";
import DoctorSpecialty from "../components/doctor/doctorSpecialty";
import DoctorTitles from "../components/doctor/doctorTitles";

export default function Doctorprofile() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const getBasicDocInfo = useSelector((x)=>x.doctorBasicInformation)
    const {DocBasicInfo, loading, error} = getBasicDocInfo

    console.log("Doc Basic Infor: ", DocBasicInfo)
    // get the details of a specific doctor
    useEffect(()=>{
        dispatch(DoctorInformation(id))
    },[dispatch, id])

    const [Personal, setPersonal] = useState({})
    const [Educ, setEducation] = useState([])
    const [Cert, setCert] = useState([])
    const [Specialization, setSpecialization] = useState([])
    const [Experience, setExperience] = useState([])
    const [Title, setTitle] = useState([])
    const [Payment, setPayment] = useState([])
    const [TimeAvailableOnline, setTimeAvailableOnline] = useState([])
    const [clinicAddress, setClinicAddress] = useState([])
    const [clinicTime, setClinicTime] = useState([])

    const EducParentFunction = (Edu) =>{
        setEducation(Edu)
    }

    const PersonalParentFunction = (personal)=>{
        setPersonal(personal)
    }
    const CertParentFunction = (cert) =>{
        setCert(cert)
    }
    const SpecializationParentFunction = (spec) =>{
        setSpecialization(spec)
    }
    const ExperienceParentFunction = (data) =>{
        setExperience(data)
    }
    const TitleParentFunction = (data) =>{
        setTitle(data)
    }
    const PaymentParentFunction = (data) =>{
        setPayment(data)
    }
    const availableOnlineParentFunction = (data)=>{
        setTimeAvailableOnline(data)
    }
    const clinicaddressParentFunction = (data) =>{
        setClinicAddress(data)
    }
    const clinicTimeParentFunction = (data) =>{
        setClinicTime(data)
    }
  

    return(
    
    <div className="container">
    <div className="row gutters">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">
        <div className="pard">
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
                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                       
                    </div>
                        
                        <div className="about">
                            <h6>Certifications</h6>
                            <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                             <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                        </div>
                    
                </div>
            </div>
        </div>
        </div>

        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
            
            <DoctorPersonal data={DocBasicInfo ? DocBasicInfo.BasicInfo : []} ParentFunction={PersonalParentFunction}/>
            <DoctorEduc data={DocBasicInfo ? DocBasicInfo.Education : []} ParentFunction={EducParentFunction}/>     
            <DoctorCert data={DocBasicInfo ? DocBasicInfo.Certification : []} ParentFunction={CertParentFunction}/>
            <DoctorSpecialty data={DocBasicInfo ? DocBasicInfo.Specialty : []} ParentFunction={SpecializationParentFunction}/>       
            <DoctorExperience data={DocBasicInfo ? DocBasicInfo.Experience : []} ParentFunction={ExperienceParentFunction}/>
            <DoctorTitles data={DocBasicInfo ? DocBasicInfo.Titles.split(" , "): []} ParentFunction={TitleParentFunction}/>
            <DoctorPayment data={DocBasicInfo ? DocBasicInfo.Payment: []} ParentFunction={PaymentParentFunction}/>
            <DoctorAvailableOnline data={DocBasicInfo ? DocBasicInfo.Available_Online: []} ParentFunction={availableOnlineParentFunction}/>
            <DoctorAvailableOffline address={DocBasicInfo ? DocBasicInfo.Clinic_Address: []} time={DocBasicInfo ? DocBasicInfo.Available_Offline: []} ParentFunction1={clinicaddressParentFunction} ParentFunction2={clinicTimeParentFunction}/>

            
        
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="text-right">
                    <button type="button" id="submit" name="submit" className="btn btn-primary">Save</button>
                </div>
            </div>
             
        </div>
    </div>
    </div>

    

    );

}