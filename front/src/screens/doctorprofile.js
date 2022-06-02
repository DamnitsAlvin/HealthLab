import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DoctorInformation } from "../actions/doctorActions";

export default function Doctorprofile() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const getBasicDocInfo = useSelector((x)=>x.doctorBasicInformation)

    const {DocBasicInfo, loading, error} = getBasicDocInfo
    console.log("Doc Basic Infor: ", DocBasicInfo)
    useEffect(()=>{
        dispatch(DoctorInformation(id))
    },[dispatch, id])


    return(
    
    <div class="container">
        <div class="row gutters">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">

        <div class="pard h-100">
            <div class="card-body">
                <div class="account-settings">

                    <div class="user-profile">
                        <div class="user-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin"/>
                        </div>
                        <h3 class="user-name">{DocBasicInfo && DocBasicInfo.BasicInfo[1].concat(" ", DocBasicInfo.BasicInfo[2], " ", DocBasicInfo.BasicInfo[3])}</h3>
                        <h4 class="user-name">{DocBasicInfo && DocBasicInfo.Titles}</h4>
                        <h6 class="user-email">{DocBasicInfo && DocBasicInfo.BasicInfo[7]}</h6>
                    </div>

                    <div class="about">
                        <h6>Education</h6>
                        <ul>
                            <li>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</li>
                            <li>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</li>
                        </ul>
                        
                        <div class="about">
                            <h6>Certifications</h6>
                            <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                             <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        <div class="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
        <div class="pard h-100">
            <div class="card-body">
                <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" class="form-control" id="fullName" placeholder="Crister Palumpon" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="eMail">Email</label>
                            <input type="email" class="form-control" id="eMail" placeholder="cristerpalumpon@gmail.com" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter phone number" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="website">Website URL</label>
                            <input type="url" class="form-control" id="website" placeholder="healthlab.com" readonly/>
                        </div>
                    </div>
                </div>
                <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mt-3 mb-2 text-primary">Address</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="Street">Street</label>
                            <input type="name" class="form-control" id="Street" placeholder="Enter Street" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="ciTy">City</label>
                            <input type="name" class="form-control" id="ciTy" placeholder="Enter City" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="sTate">State</label>
                            <input type="text" class="form-control" id="sTate" placeholder="Enter State" readonly/>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="zIp">Zip Code</label>
                            <input type="text" class="form-control" id="zIp" placeholder="Zip Code" readonly/>
                        </div>
                    </div>
                </div>
                <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h6 class="mt-3 mb-2 text-primary">Appointment</h6>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="Street">Mode of Consultation</label>
                            <input type="name" class="form-control" id="Street" placeholder="VIRTUAL" readonly/>
                        </div>
                    </div>
                    
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                            <label for="ciTy">Mode of Payment</label>
                            <input type="name" class="form-control" id="ciTy" placeholder="GCASH, CREDIT CARD" readonly/>
                        </div>
                    </div>
                   
                </div>
                <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="text-right">
                           
                            <button type="button" id="submit" name="submit" class="btn btn-primary">Edit Profile</button>
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