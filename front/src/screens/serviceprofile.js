import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

export default function ServiceProfile(){
    const getuserInfo = useSelector(x=>x.userSignIn)
    const {userInfo} = getuserInfo

    const [serviceInfo, setserviceInfo] = useState()
    const [time, settime] = useState()
    const [location, setlocation] = useState()
    const [payment, setpayment] = useState()
    const [offered, setoffered] = useState()

    useEffect( async()=>{
        const {data} = await axios.get(`http://localhost:5000/api/serviceInfo?service_id=${userInfo.data[0]}`)
        if(data){
            setserviceInfo(data.service_info)
            settime(data.available_time)
            setlocation(data.location)
            setpayment(data.payment)
            setoffered(data.service_offered)
        }
    }, [userInfo])

    // console.log(serviceInfo)
    // console.log(time)
    // console.log(location)
    // console.log(payment)
    // console.log(offered)
    const labels = [
        "Service ID", 
        'Service Name', 
        '',
        'Email', 
        'Password', 
        'Image'
    ]
    return(
        <div className="container">  
        <div className="row gutters">

        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 ">
        <div className="pard h-100">
        
            <div className="card-body">
                <div className="account-settings">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src={serviceInfo && serviceInfo[5] ? serviceInfo[5] : "https://bootdey.com/img/Content/avatar/avatar7.png" }alt="Maxwell Admin"/>
                        </div>
                        <h3 className="user-name">{serviceInfo && serviceInfo[1]}</h3>
                        <h4 className="user-email">{serviceInfo && serviceInfo[3]}</h4>
                        <h5 className="user-email">{serviceInfo && serviceInfo[0]}</h5>
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
                        <h6 className="mb-2 text-primary">Service Information</h6>
                    </div>
                    {
                        serviceInfo && serviceInfo.map((value,index)=>(
                            index == 0 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="text" className="form-control"  value={value} disabled />
                                </div>
                            </div>
                            ): index==2 || index== 6 ?(
                                <></>
                            ): index==5 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="file" className="form-control"/>
                                </div>
                            </div>
                            ): index==4 ? (
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="password" className="form-control"  value={value} disabled />
                                </div>
                            </div>
                            ): (
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12" key={index}>
                                <div className="form-group">
                                    <label >{labels[index]}</label>
                                    <input type="text" className="form-control"  value={value}/>
                                </div>
                            </div>
                            )
                        ))
                    }
                        
                </div>
                

                

                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="text-right">  
                            <button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
    )
}