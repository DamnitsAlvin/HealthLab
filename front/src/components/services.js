import React from "react";

export default function Service(){
    return(
        <section id="service" className="home-section nopadding paddingtop-60">
		<div className="container">
			<div className="row">
				<div className="col-sm-6 col-md-6">
					<div className="wow fadeInUp" data-wow-delay="0.2s">
						<img src="img/dummy/img-1.jpg" className="img-responsive" alt="" />
					</div>
				</div>
				<div className="col-sm-3 col-md-3">
					<div className="wow fadeInRight" data-wow-delay="0.1s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-stethoscope fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Medical checkup</h5>
								<p>General Consultation for every patient</p>
							</div>
						</div>
					</div>
					<div className="wow fadeInRight" data-wow-delay="0.2s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-wheelchair fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Nursing Services</h5>
								<p>Handled by the healthcare workers</p>
							</div>
						</div>
					</div>
					<div className="wow fadeInRight" data-wow-delay="0.3s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-plus-square fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Maternal Health</h5>
								<p>Prenatal, Postpartum, Cancer Surveillance</p>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-3 col-md-3">
					<div className="wow fadeInRight" data-wow-delay="0.1s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-h-square fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Child health & nutrition</h5>
								<p>Nutrition assessment</p>
							</div>
						</div>
					</div>
					<div className="wow fadeInRight" data-wow-delay="0.2s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-filter fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Oral Health</h5>
								<p>Dental care issues</p>
							</div>
						</div>
					</div>
					<div className="wow fadeInRight" data-wow-delay="0.3s">
						<div className="service-box">
							<div className="service-icon">
								<span className="fa fa-user-md fa-3x"></span>
							</div>
							<div className="service-desc">
								<h5 className="h-light">Nutrition</h5>
								<p>Routine immunization and supplementation</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}