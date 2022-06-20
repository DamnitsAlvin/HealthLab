import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfile, updateProfile } from '../actions/userActions';
import { UpdateImage } from "../actions/doctorActions"


export default function UserProfile(){
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    const getUserInfo = useSelector(x=>x.userSignIn)
    const {userInfo} = getUserInfo

    const getUserDetail = useSelector(x => x.getUser)
    const {UserDetails} = getUserDetail

    const getUpdateStats = useSelector(x=>x.updateUserInfo)
    const {UpdateUser} = getUpdateStats
    const [data, setData] = useState(UserDetails ? UserDetails.userData: [])
    const [fileChange, setfileChange] = useState(false)
    const [userImage, setuserImage] = useState("")

    useEffect(()=>{
        if(userInfo.data[0]){
            dispatch(GetUserProfile(userInfo.data[0]))
        }
       
    }, [dispatch])

    useEffect(()=>{
        if(UserDetails && UserDetails.userData){
            setData(UserDetails.userData)
        }
    }, [UserDetails])


    if(data){
        console.log("data:" ,data)
    }
    
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

    const submitHandler = async(event) =>{
        event.preventDefault()
        //upload image
        
        if(userImage){
            const formData = new FormData()
            formData.append('id', userInfo.data[0])
            formData.append('file', userImage)
            dispatch1(UpdateImage(formData))
            console.log("succcess!!!!!")
        }
        dispatch1(updateProfile(data))

        if(UpdateUser){
            dispatch(GetUserProfile(userInfo.data[0]))
        }
        //action update personal info of doctor
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
                            <img src={UserDetails && UserDetails.userData[15] ? UserDetails.userData[15]:"https://bootdey.com/img/Content/avatar/avatar7.png" } alt="Maxwell Admin"/>
                        </div>
                        <h3 className="user-name">{UserDetails && UserDetails.userData[1].concat(" ", UserDetails.userData[2])}</h3>
                        <h4 className="user-email">{UserDetails && UserDetails.userData[12]}</h4>
                        <h5 className="user-email">{UserDetails && UserDetails.userData[0]}</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>


        <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
        <div className="pard h-100">
            <div className="card-body">
            <form method="post">
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
                        <div className="text-right">  
                            <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={submitHandler}>Update</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
}