import React from "react";
import CheckoutSteps from "../components/checkout";

export default function MedicalHistory(){
    return(
        <div classNameName="bodyform">
        <div className="signup-form">
            <form  method="post">
                <CheckoutSteps step1 step2 />
		        <h2>Sign Up</h2>
		        <p>Please fill your medical history</p>
		        <hr/>
                 

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed"></label>
                        <div className="option-header">
                            <label className="option">Yes </label>
                            <label className="option">No </label>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has severed headaches ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="headache"/> 
                            <input type="radio" className="option" name="headache"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has heart attack/hypertension ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="heartattack"/> 
                            <input type="radio" className="option" name="heartattack"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has non-traumatic hematuria ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="nh"/> 
                            <input type="radio" className="option" name="nh"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has former cancer/malignant cancer ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cancer"/> 
                            <input type="radio" className="option" name="cancer"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has chest pain ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="chest"/> 
                            <input type="radio" className="option" name="chest"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has cough for 14 days ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="cough"/> 
                            <input type="radio" className="option" name="cough"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Has unexplained vaginal bleeding ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="bleed"/> 
                            <input type="radio" className="option" name="bleed"/>
                        </div>
                </div>

                <div className="form-check form-check-inline heads">
                        <label className="title" for="civilwidowed">Is a smoker ? </label>
                        <div className="option-header">
                            <input type="radio" value="this is a value" className="option" name="smoker"/> 
                            <input type="radio" className="option" name="smoker"/>
                        </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg">Next</button>
                </div>

               
            </form>
        </div>
    </div>
    );
}