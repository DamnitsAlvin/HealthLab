import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile } from '../actions/userActions';


export default function UserProfile(){
    const dispatch = useDispatch()
    const getUserInfo = useSelector(x=>x.userSignIn)
    const {userInfo} = getUserInfo
   

    useEffect(()=>{
        if(userInfo.data[0]){
            dispatch(GetUserProfile(userInfo.data[0]))
        }
    })
    
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
                        <h3 className="user-name"></h3>
                        <h5 className="user-email"></h5>
                    </div>
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
                        <h6 className="mb-2 text-primary">Personal Information</h6>
                       
                    </div>
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