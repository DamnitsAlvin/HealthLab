import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, updateProfile } from '../actions/userActions';
import { UpdateImage } from "../actions/doctorActions"


export default function UserProfile(){
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    const reft = useRef()
   
    //get data 
    const getUserInfo = useSelector(x=>x.userSignIn)
    const {userInfo} = getUserInfo

    const getUserDetail = useSelector(x => x.getUser)
    const {UserDetails} = getUserDetail

    const getUpdateStats = useSelector(x=>x.updateUserInfo)
    const {loading, UpdateUser} = getUpdateStats

     //states
     const [data, setData] = useState(UserDetails ? UserDetails.userData: [])
     const [fileChange, setfileChange] = useState(false)
     const [userImage, setuserImage] = useState("")
     const fields = [
        "User ID", 
        "First Name", 
        "Last Name", 
        "Middle Name", 
        "Birthday", 
        "Sex", 
        "Address Line 1", 
        "Address Line 2", 
        "Municipality", 
        "Province", 
        "Civil Status", 
        "Phone Number", 
        "Email", 
        "Password", 
        "", 
        "Image"
    ]
   

    // Get the user profile and display it in the page 
    useEffect(()=>{
        if(userInfo.data[0]){
            //returned as array
            dispatch(GetUserProfile(userInfo.data[0]))
        }
        if(reft){
            console.log(reft)
            reft.current.focus()
        }
    }, [dispatch])

    // if the user profile was loaded, load the data also
    useEffect(()=>{
        if(UserDetails && UserDetails.userData){
            setData(UserDetails.userData)
        }
    }, [UserDetails])

    //checking data before passing to 
    if(data){
        console.log("data:" ,data)
    }
    


    const PersonalChangeHandler = (event, index) =>{
        const values = [...data]
        values[index] = event.target.value
        setData(values)
    }

    const fileChangeHandler = (event, index) =>{
        const extension = event.target.files[0].name.split(".")[1]
        const filename = data[0] + "Image." +extension
        const values = [...data]
        values[index] = "/uploads/"+ filename
        setData(values)
        setfileChange(true)
        setuserImage(event.target.files[0])
    }

    const submitHandler = (event) =>{
        event.preventDefault()
        //upload image
        console.log("Clicked")

        dispatch1(updateProfile(data))

        //this block rerenders the whole page, dunno why?
        if(userImage){
            const formData = new FormData()
            formData.append('id', userInfo.data[0])
            formData.append('file', userImage)
            dispatch1(UpdateImage(formData))
            console.log("succcess!!!!!")
        }
        console.log('done')
        
        //this also causes error, dunno why?
        // if(UpdateUser){
        //     dispatch(GetUserProfile(userInfo.data[0]))
        //     reft.current.focus()
        // }

        setTimeout(()=>{
            const inter = document.getElementById("inter")
            if(inter){
                inter.style.display = "none"
            }
            
        }, 3000)
        //action update personal info of doctor
    }
    
    
    return(

        <div className="container">  
        <div className="row gutters">

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">
        <div className="pard h-100" ref={reft}>
        
            <div className="card-body">
                <div className="account-settings">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src={UserDetails && UserDetails.userData[15] ? UserDetails.userData[15]:"https://bootdey.com/img/Content/avatar/avatar7.png" } alt="Maxwell Admin"/>
                        </div>
                        <h3 className="user-name"id="userprof">{UserDetails && UserDetails.userData[1].concat(" ", UserDetails.userData[2])}</h3>
                        <h5 className="user-email"id="userprof2">{UserDetails && UserDetails.userData[0]}</h5>
                        <h4 className="user-email"id="userprof1">{UserDetails && UserDetails.userData[12]}</h4>
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
                        <h6 className="mb-2 text-primary">Personal Information</h6>
                    </div>
                    
                        {
                            data && data.map((value, index)=>(
                                index==0 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <input type="text" className="form-control" value={value} disabled />
                                    </div>
                                </div>
                                ):
                                index==4 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <input type="date" className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)}/>
                                    </div>
                                </div>
                                ) :
                                index==5 ?(
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <select type="date" className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                ): 
                                index>5 && index<10 ? (
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <input type="text" className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)}/>
                                    </div>
                                 </div>
                                ):
                                index==10 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <select type="date" className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)}>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </select>
                                    </div>
                                </div>
                                ): index==13 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <input type="password" className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)}/>
                                    </div>
                                </div>
                                ) : index==14 ? (<></>)
                                : index==15 ? (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label htmlFor="fullName">{fields[index]}</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={(event)=>fileChangeHandler(event,index)}/>
                                </div>
                                </div>
                                ):(
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                    <div className="form-group">
                                        <label htmlFor="fullName">{fields[index]}</label>
                                        <input type="text"  className="form-control" value={value} onChange={(event)=>PersonalChangeHandler(event, index)} />
                                    </div>
                                </div>
                                )
                                
                            ))
                        }
                   
                </div>
                
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        {UpdateUser ? <div id="inter" className="alert alert-success">Successfully Updated!</div>: UpdateUser ?<div id="inter"  className="alert alert-danger">Record update failed!</div> : <></>}     
                    </div>
                </div>
                

                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">  
                            <button type="button" className="btn btn-primary" onClick={(event)=>submitHandler(event)} disabled={loading}>Update</button>
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