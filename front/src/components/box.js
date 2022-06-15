import React from "react";

export default function Box(){
    return(
        <div>
            <section id="boxes" className="home-section paddingtop-80">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-md-3">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <div className="box text-center">

                                <i className="fa fa-check fa-3x circled bg-skin"></i>
                                <h4 className="h-bold">Make an appoinment</h4>
                                <p>
                                    Find out available doctors for your health concerns.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <div className="box text-center">

                                <i className="fa fa-list-alt fa-3x circled bg-skin"></i>
                                <h4 className="h-bold">Wait announcements</h4>
                                <p>
                                    First come first serve basis
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <div className="box text-center">
                                <i className="fa fa-user-md fa-3x circled bg-skin"></i>
                                <h4 className="h-bold">Help by specialist</h4>
                                <p>
                                    Handled by professional medical personnels
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                            <div className="box text-center">

                                <i className="fa fa-hospital-o fa-3x circled bg-skin"></i>
                                <h4 className="h-bold">Get diagnostic report</h4>
                                <p>
                                   Immediate report will be sent after consultation
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="callaction" className="home-section paddingtop-40">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="callaction bg-gray">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="cta-text">
                                            <h3>In an emergency? Need help now?</h3>
                                            <p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="wow lightSpeedIn" data-wow-delay="0.1s">
                                        <div className="cta-btn">
                                            <a href="/" className="btn btn-skin btn-lg">Book an appoinment</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}