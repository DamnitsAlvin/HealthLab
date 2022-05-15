import React from "react";

export default function CheckoutSteps(props){
    return(
        <div className="rowh checkout-steps">
            <div className = {props.step1 ? 'active': ""}>Personal Information</div>
            <div className = {props.step2 ? 'active': ""}>Others</div>
        </div>
    );
}