import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DoctorInformation } from "../actions/doctorActions";

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

    const [Educ, setEducation] = useState([{}])
    const [formState, setformState] = useState({
        doctor_id: "",
        first_name: "", 
        middle_name: "", 
        last_name: "", 
        suffix : "", 
        birthday: "", 
        phone: "", 
        email: '', 
        mode_of_consultation: "Virtual", 
        doctor_image: "", 
        password: "", 
    })
    const BasicFormFields = [
        "First Name", 
        "Middle Name",
        "Last Name", 
        "Suffix" , 
        "Birthday", 
        "Phone", 
        "Email", 
        "Mode of Consulation", 
        "doctor_image",
        "Password"]
    const BasicFormFields2 = Object.keys(formState)
    console.log("Keys:", BasicFormFields2)

    useEffect(()=>{
        setEducation(DocBasicInfo ? DocBasicInfo.Education : [{}])
        setformState(DocBasicInfo ? {
           doctor_id: DocBasicInfo.BasicInfo[0],
            first_name: DocBasicInfo.BasicInfo[1], 
            middle_name: DocBasicInfo.BasicInfo[2], 
            last_name: DocBasicInfo.BasicInfo[3], 
            suffix : DocBasicInfo.BasicInfo[4], 
            birthday:DocBasicInfo.BasicInfo[5], 
            phone: DocBasicInfo.BasicInfo[6], 
            email: DocBasicInfo.BasicInfo[7], 
            mode_of_consultation: DocBasicInfo.BasicInfo[8], 
            doctor_image: DocBasicInfo.BasicInfo[9], 
            password: "",   
        }: {} )
    }, [DocBasicInfo])

    const BasicInfoChangeHandler = (event, index) =>{
        setformState({
            ...formState, 
            [BasicFormFields2[index+1]]: event.target.value
        })
    }

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
        <div className="pard h-100">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>
                    
                    {BasicFormFields.map((value, index)=>(
                        index == 4 ? (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label htmlFor="fullName">{value}</label>
                                <input type="date" className="form-control" id="fullName"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={DocBasicInfo && DocBasicInfo.BasicInfo[index+1]} />
                            </div>
                        </div>
                        ) :
                        index==5 ? (
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label htmlFor="fullName">{value}</label>
                                <input type="text" className="form-control" placeholder="&#xf095; xxxx-xxx-xxxx" onChange={(event)=>BasicInfoChangeHandler(event, index)} pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" value={DocBasicInfo && DocBasicInfo.BasicInfo[index+1]} />      
                            </div>
                        </div>
                        ): 
                        index==7 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label htmlFor="fullName">{value}</label>
                                <select className="form-control"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={DocBasicInfo && DocBasicInfo.BasicInfo[index+1]}>
                                    <option value="0">&#xf03d; Virtual</option>
                                    <option value="1">&#xf500; Face to Face</option>
                                    <option value="2">&#xf0c0; Both</option>
                                </select>
                            </div>
                            </div>
                        ):
                        index==8 ? (<>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{value}</label>
                                    <input type="file" className="form-control" id="fullName"   onChange={(event)=>BasicInfoChangeHandler(event, index)} />
                                </div>
                            </div>
                        </>) : 
                        index==9 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label htmlFor="fullName">{value}</label>
                                <input type="password" className="form-control" id="fullName"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={DocBasicInfo && DocBasicInfo.BasicInfo[index+1]} />
                            </div>
                        </div>
                        ) : 
                        ( 
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                            <div className="form-group">
                                <label htmlFor="fullName">{value}</label>
                                <input type="text" className="form-control" id="fullName"  onChange={(event)=>BasicInfoChangeHandler(event, index)} value={DocBasicInfo && DocBasicInfo.BasicInfo[index+1]} />
                            </div>
                        </div>)
                       

                    ))}




                   
                   
                  
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="Street">Street</label>
                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="ciTy">City</label>
                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="sTate">State</label>
                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="zIp">Zip Code</label>
                            <input type="text" className="form-control" id="zIp" placeholder="Zip Code" readOnly/>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Appointment</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="Street">Mode of Consultation</label>
                            <input type="name" className="form-control" id="Street" placeholder="VIRTUAL" readOnly/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="ciTy">Mode of Payment</label>
                            <input type="name" className="form-control" id="ciTy" placeholder="GCASH, CREDIT CARD" readOnly/>
                        </div>
                    </div>
                   
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                           
                            <button type="button" id="submit" name="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>




        
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"></div>
        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
        <div className="pard h-100">
            <div className="card-body">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" className="form-control" id="fullName" placeholder="Crister Palumpon" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="eMail">Email</label>
                            <input type="email" className="form-control" id="eMail" placeholder="cristerpalumpon@gmail.com" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder="Enter phone number" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="website">Website URL</label>
                            <input type="url" className="form-control" id="website" placeholder="healthlab.com" readOnly/>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="Street">Street</label>
                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="ciTy">City</label>
                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="sTate">State</label>
                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" readOnly/>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="zIp">Zip Code</label>
                            <input type="text" className="form-control" id="zIp" placeholder="Zip Code" readOnly/>
                        </div>
                    </div>
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 className="mt-3 mb-2 text-primary">Appointment</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="Street">Mode of Consultation</label>
                            <input type="name" className="form-control" id="Street" placeholder="VIRTUAL" readOnly/>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                            <label htmlFor="ciTy">Mode of Payment</label>
                            <input type="name" className="form-control" id="ciTy" placeholder="GCASH, CREDIT CARD" readOnly/>
                        </div>
                    </div>
                   
                </div>
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">
                           
                            <button type="button" id="submit" name="submit" className="btn btn-primary">Save</button>
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