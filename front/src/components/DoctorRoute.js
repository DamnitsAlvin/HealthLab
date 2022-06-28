import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom'

export default function DoctorRoute({path, element}){
    const getUserInfo = useSelector(x => x.userSignIn)
    const {userInfo} = getUserInfo

    const navigate = useNavigate()
    return(
        <Route path={path} element={userInfo && userInfo.data[2]=="doctor" ? element : null}>
            {!userInfo || userInfo.data[2]!="doctor" ? navigate("/signin") : null}
        </Route>
    )
}