import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Categories(){
  const navigate = useNavigate()
  const cardClick = (category) =>{
    navigate(`/doctor/${category}`)
  }

    return(
     
  
        <div class="category">
        <div>
        
		<div className="container marginbot-50">
			<div className="row">
				<div className="col-lg-8 col-lg-offset-2">
					<div className="wow fadeInDown" data-wow-delay="0.1s">
						<div className="section-heading text-center">
							<h2 className="h-bold">Top Specialties</h2>
							<p>People have been looking for these specialties.</p>
						</div>
					</div>

				</div>
			</div>
		</div>
          <div class="card-container">
            <div class="card" onClick={()=>{cardClick("General \ Medicince")}}>
              <div class="card-image-1">
               
    
              </div>
              <div class="card-name">General Medicine
              </div>
            </div>
            <div class="card" onClick={()=>{cardClick("Neurology")}}>
              <div class="card-image-2">
    
              </div>
              <div class="card-name">Neurology
              </div>
            </div>
            <div class="card" onClick={()=>{cardClick("Cardiology")}}>
              <div class="card-image-3">
    
              </div>
              <div class="card-name">Heart and Cardiology
              </div>
            </div>
            <div class="card">
              <div class="card-image-4" onClick={()=>{cardClick("Nephrology")}}>
    
              </div>
              <div class="card-name">Kidney and Urine
              </div>
            </div>
            <div class="card">
              <div class="card-image-5" onClick={()=>{cardClick("OB-GYNE")}}>
    
              </div>
              <div class="card-name">OB-GYN's & Women's Health
              </div>
            </div>
            <div class="card">
              <div class="card-image-6" onClick={()=>{cardClick("Optalmology")}}>
            
              </div>
              <div class="card-name">Optalmology
              </div>
            </div>
            <div class="card">
              <div class="card-image-7" onClick={()=>{cardClick("Dermatology")}}>
    
              </div>
              <div class="card-name" >Dermatology
              </div>
            </div>
            <div class="card">
              <div class="card-image-8" onClick={()=>{cardClick("Dentistry")}}>
    
              </div>
              <div class="card-name">Dentistry
              </div>
            </div>
           
              
            </div>
          </div>
        </div>


    );

}