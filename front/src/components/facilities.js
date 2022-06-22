import React from "react";
import { useNavigate } from "react-router-dom";

export default function Facilities(){
  const navigate = useNavigate()
    return(
        <section id="facilities" className="home-section paddingbot-60">
		<div className="container marginbot-15" id="spaceVin">
			<div className="row">
				<div className="col-lg-8 col-lg-offset-2">
					<div className="wow fadeInDown" data-wow-delay="0.1s">
						<div className="section-heading text-center">
							<h2 className="h-bold" id="">Top Services</h2>
							<p>Easily access doctors offering these services</p>
						</div>
					</div>
					
				</div>
			</div>
		</div>
        <div class="category">
        <div>
          <div class="card-container">

            <div class="card" onClick={()=>navigate(`/service/Blood Chemistry`)}>
              <div class="card-image-s1">
    
              </div>
              <div class="card-name">Blood Chemistry
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/Urinalysis`)}>
              <div class="card-image-s2">
    
              </div>
              <div class="card-name">Urinalysis
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/PCR Testing`)}>
              <div class="card-image-s3">
    
              </div>
              <div class="card-name">PCR Testing
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/Saliva Testing`)}>
              <div class="card-image-s4">
    
              </div>
              <div class="card-name">Saliva Testing
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/X-RAY`)}>
              <div class="card-image-s5">
    
              </div>
              <div class="card-name">X-RAY
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/Physical Therapy`)}>
              <div class="card-image-s6">
            
              </div>
              <div class="card-name">Physical Therapy
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/CT-Scan`)}>
              <div class="card-image-s7">
    
              </div>
              <div class="card-name">CT-Scan
              </div>
            </div>

            <div class="card" onClick={()=>navigate(`/service/Mental Health`)}>
              <div class="card-image-s8">
    
              </div>
              <div class="card-name">Mental Health
              </div>
            </div>
           
              
            </div>
          </div>
        </div>

		<div className="container">
			<div className="row">
				<div className="col-sm-12 col-md-12 col-lg-12">
					<div className="wow bounceInUp" data-wow-delay="0.2s">
						<div id="owl-works" className="owl-carousel">
							<div className="item"><a href="img/photo/1.jpg" title="This is an image title"><img
										src="img/photo/1.jpg" className="img-responsive" alt="img"/></a></div>
							<div className="item"><a href="img/photo/2.jpg" title="This is an image title"
									data-lightbox-gallery="gallery1" data-lightbox-hidpi="img/works/2@2x.jpg"><img
										src="img/photo/2.jpg" className="img-responsive " alt="img"/></a></div>
							<div className="item"><a href="img/photo/3.jpg" title="This is an image title"
									data-lightbox-gallery="gallery1" data-lightbox-hidpi="img/works/3@2x.jpg"><img
										src="img/photo/3.jpg" className="img-responsive " alt="img"/></a></div>
							<div className="item"><a href="img/photo/4.jpg" title="This is an image title"
									data-lightbox-gallery="gallery1" data-lightbox-hidpi="img/works/4@2x.jpg"><img
										src="img/photo/4.jpg" className="img-responsive " alt="img"/></a></div>
							<div className="item"><a href="img/photo/5.jpg" title="This is an image title"
									data-lightbox-gallery="gallery1" data-lightbox-hidpi="img/works/5@2x.jpg"><img
										src="img/photo/5.jpg" className="img-responsive " alt="img"/></a></div>
							<div className="item"><a href="img/photo/6.jpg" title="This is an image title"
									data-lightbox-gallery="gallery1" data-lightbox-hidpi="img/works/6@2x.jpg"><img
										src="img/photo/6.jpg" className="img-responsive " alt="img"/></a></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}