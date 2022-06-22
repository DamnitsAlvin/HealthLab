import React from "react"
import { useSearchParams } from "react-router-dom"

export default function AccountRegister(){
    const [searchParams] = useSearchParams()
    const username = searchParams.get("username")

    return(
        <div className="wow fadeInDown" data-wow-delay="0.1s">
        <div className="centerContainerVin">
            <div className="success">
                <div className="imagehandler">
                    <img src="./img/svg icons/check-mark.png"/>
                </div>
                <div className="successVin">
                You are now successfully registered! Please proceed to  <a href="/signintype"><span className="pogi">Log in page</span></a> <br/>
                Your username is: <strong>{username}</strong>
                </div>
            </div>
        </div>
        </div>
    )

}