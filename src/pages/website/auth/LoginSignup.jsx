import React, { useEffect, useState } from "react";
import HeaderMenu from '../../../components/headermenu';
import MobileMenu from '../../../components/mobilemenu';
import 'react-phone-input-2/lib/style.css';
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { app_url } from '../../../common/Helpers';
const About = () => {
    return (
        <>
            {/* <!-- mobile nav --> */}
            <HeaderMenu />
            <div class="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
                <MobileMenu />
                <h1 class="banner-h fw-bold text-white text-uppercase mb-0 pb-0 animate__animated animate__bounce">
                    Login / Sign up
                </h1>
                <div class="banner-child bg-white px-0" style={{ border: '1px solid #eee' }}>
                    <div className='row p-5'>
                        <div className="col-md-6 mb-5">
                            <div className="event_category_box gradient-blue text-center float-right">
                                <h3 className="event-category-title theme-color">Customer</h3>
                                <p className="event-category-desc text-black mb-4">Welcome to TIXME,</p>
                                <div className="text-center">
                                    <Link to={app_url + 'auth/customer/login'} className="btn btn-primary text-white px-5"><span className="mr-2"><FiLogIn /></span> Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-5">
                            <div className="event_category_box gradient-grey text-center">
                                <h3 className="event-category-title theme-color">Customer</h3>
                                <p className="event-category-desc text-black mb-4">Welcome to TIXME,</p>
                                <div className="text-center">
                                    <Link to={app_url + 'auth/customer/signup'} className="btn btn-primary text-white px-5"><span className="mr-2"><FiPlus /></span> Sign Up</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-5">
                            <div className="event_category_box gradient-blue text-center float-right">
                                <h3 className="event-category-title theme-color">Organizer</h3>
                                <p className="event-category-desc text-black mb-4">Welcome to TIXME,</p>
                                <div className="text-center">
                                    <Link to={app_url + 'auth/organizer/login'} className="btn btn-primary text-white px-5"><span className="mr-2"><FiLogIn /></span> Login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-5">
                            <div className="event_category_box gradient-grey text-center">
                                <h3 className="event-category-title theme-color">Organizer</h3>
                                <p className="event-category-desc text-black mb-4">Welcome to TIXME,</p>
                                <div className="text-center">
                                    <Link to={app_url + 'auth/organizer/signup'} className="btn btn-primary text-white px-5"><span className="mr-2"><FiPlus /></span> Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <div class="space-height" style={{ height: '600px' }}></div>

        </>
    );
};

export default About;
