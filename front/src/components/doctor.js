import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";

import { displayalldoctor } from "../actions/userActions";


export default function Doctor(){
	
	const loaddoc = useSelector((state)=>state.loadDoctor); 
	const {loading, doctor, error} = loaddoc; 
	const dispatch = useDispatch();

	const [doctorToDisplay, setDoctorToDisplay] = useState([]);
	const [doctorInfo, setDoctorInfo] = useState([]);

	const buttonPressed = (text)=>{
        let matches = []; 
		let matchesInfo = []; 
        if(text.length > 0){
            matches = doctor.data.filter((doc, index) =>{
                const regex = new RegExp(`${text}`, "gi");
				if(doc[1].match(regex)){
					matchesInfo.push(doctor.doctor_info[index])
					return doc[1].match(regex);
				}
            })
        }
        setDoctorToDisplay(matches);
		setDoctorInfo(matchesInfo);	
    }

	// useEffect(()=>{
	// 	dispatch(displayalldoctor("1"));	
	// }, [dispatch])


	
	const clickall = ()=>{
		dispatch(displayalldoctor("1"));
			if(doctor){
				setDoctorToDisplay(doctor.data);
				setDoctorInfo(doctor.doctor_info);
			}
	}
	
    return(
	<section id="doctor" className="home-section bg-gray paddingbot-60" >
		<div className="container marginbot-50">
			<div className="row">
				<div className="col-lg-8 col-lg-offset-2">
					<div className="wow fadeInDown" data-wow-delay="0.1s">
						<div className="section-heading text-center">
							<h2 className="h-bold">Doctors</h2>
							<p>Meet our professional health care workers</p>
						</div>
					</div>
					<div className="divider-short"></div>
				</div>
			</div>
		</div>

		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div id="filters-container" className="cbp-l-filters-alignLeft">
						<button data-filter="*" className="cbp-filter-item-active cbp-filter-item" onClick={clickall}>All</button>
						<div  className="cbp-filter-item" onClick={e=>buttonPressed("General Health")}>General Physicians</div>
						<div  className="cbp-filter-item" onClick={e=>buttonPressed("OB-GYNE")}> Maternal Health </div>
						<div  className="cbp-filter-item" onClick={e=>buttonPressed("Dentistry")}> Dentist </div>
						<div  className="cbp-filter-item" onClick={e=>buttonPressed("Opthalmologist")} >Ophthalmologist</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div className="container">
			<div className="row">
			{ doctorToDisplay  ? (
					<>
						{doctorToDisplay.map((value,index)=>(
							
							<div class="a-box">
								<div class="img-container">
								<div class="img-inner">
									<div class="inner-skew">
									<img src="./img/doctor/d1.jpg" alt="doctorImage"/>
									</div>
								</div>
								</div>
								<div class="text-container">
								<h3>{"Dr. " + doctorInfo[index][1] + " " + doctorInfo[index][2] }</h3>
								<h5>{value[1]}</h5>
								<h6>{value[2]}</h6>
								<div>
								Ante in nibh mauris cursus mattis. Pendisse in est. Porttitor eget dolor morbi non arcu risus quis. 
								</div>
							</div>
						  </div>
								
							
						))}
					</>
					) : (<div></div>)
				}
				
			</div>
		</div>
			
	

		
				
		
	</section>
    )
}