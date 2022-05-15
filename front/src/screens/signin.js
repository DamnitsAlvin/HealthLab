import React , {useEffect, useState} from "react"; 
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { usersignin } from "../actions/userActions";



export default function SignIn(props){
  const [ID,setID] = useState("");
  const [password, setPassword] = useState("");
  const [userLabel, setUserLabel] = useState("")
  const [placeHolder, setPlaceHolder] = useState("")
  const {user} = useParams(); 
  const userType = user; 
  useEffect( ()=>{
    setUserLabel(userType.charAt(0).toUpperCase() + userType.slice(1) + " ID")
    setPlaceHolder(`Enter ${userLabel} or email`)
  }, [userType, userLabel])
  console.log("userType: " , userType)
    //const redirect = props.location.search ? props.location.search.split('=')[1] : "/";
    
    const userSignin = useSelector((state)=>state.userSignIn);
    const { userInfo, loading, error } = userSignin;
    if(userInfo){
      console.log("userInfo :", userInfo, " loading: ", loading)
    }
  
    
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(usersignin(ID,password, userType))
    }
    // useEffect(()=>{
    //   if(userInfo){
    //     props.history.push(redirect);
    //   }
    // }, [props.history, redirect, userInfo])
    return(
        <div className= "signinform">
          <div className='halfImage'>
             <img src="/img/backgrounds/signin_BG.jpg" alt ="signinbackground"/>
          </div>
       
          <form className="form" onSubmit={submitHandler}>
            <div>
              <h1>ACCOUNT LOGIN</h1>
              <p class="parag">Login here using Email and Password</p>
            </div>
            <div>
              <label htmlFor="ID">{userLabel}</label>
              <input class="boxShadow"
                type="text"
                id="ID"
                placeholder={placeHolder}
                required
                onChange={(e) => setID(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label htmlFor="password">Password</label>
              <input class="boxShadow"
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="btn signin-submit" type="submit">
                Sign In
              </button>
            </div>
            <div>
              <label />
              <div class="new">
                New user? <Link to={userType=="user" ? "/register": "/registerService"}>Create your account</Link>
              </div>
            </div>
          </form>
        </div>
    )
}