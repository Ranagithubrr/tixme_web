import React from "react";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import location from "./assets/location (5) 1.svg";
import music from "./assets/music.svg";
import nightlife from "./assets/nightlife.svg";
import business from "./assets/business.svg";
import sport from "./assets/sport.svg";
import foot from "./assets/food.svg";
import art from "./assets/art.svg";
import { app_url } from "../common/Helpers";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-white bg-white mx-4 rounded-8 top-10 d-lg-block d-none">
                <div class="container-fluid pe-0">
                    <img class="nav-logo ms-lg-5 ms-2" src={Logo} alt="" />
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 position-relative">
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link
                                    class="nav-link text-primary pe-1 font-nav"
                                    to={app_url}
                                >
                                    Home  <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <a class="nav-link text-primary pe-1 font-nav" href="#">
                                    Events{" "}
                                    <img class="nav-plus" src={plus} alt="" />
                                </a>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link
                                    class="nav-link text-primary pe-1 font-nav"
                                    to={app_url + 'aboutus'}
                                >
                                    About Us
                                    <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item d-flex align-items-center justify-content-center me-xl-5 me-3">
                                <Link
                                    class="nav-link text-primary pe-1 font-nav"
                                    to={app_url + 'contact'}
                                >
                                    Contact Us
                                    <img class="nav-plus" src={plus} alt="" />
                                </Link>
                            </li>
                            <li class="nav-item border rounded border-primary align-self-center me-7">
                                <Link class="nav-link text-primary pt-1 pb-1p font-nav" to={app_url + 'auth/organizer/signup'}>
                                    List your event
                                </Link>
                            </li>
                            <li class="nav-item position-absolute end-0 bg-white nav-box me-0 d-flex flex-column justify-content-center align-items-center rounded-8">
                                <Link class="nav-link text-primary pt-1 pb-1p font-nav" to={app_url + 'auth/customer/login'}>
                                    Login/Sign Up
                                </Link>
                                <div class="d-flex align-items-center justify-content-center">
                                    <img class="nav-loc" src={location} alt="" />
                                    <a
                                        class="nav-link text-primary px-1 font-nav-small"
                                        href="#"
                                    >
                                        Location
                                        <img class="nav-plus" src={plus} alt="" />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
