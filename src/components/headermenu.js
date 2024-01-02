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
import { Link } from "react-router-dom";
import foot from "./assets/food.svg";
import art from "./assets/art.svg";
import { app_url, apiurl, organizer_url, customer_url } from "../common/Helpers";
const Header = () => {
  const customer_token = localStorage.getItem("userauth");
  const organizername = localStorage.getItem("organizername");
  const country_name = localStorage.getItem("countryname");
  const accountTargetUrl = customer_token
    ? customer_url + "dashboard"
    : organizername
      ? organizer_url + "dashboard"
      : app_url + "auth/customer/login";
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-white bg-white d-lg-none mx-4 rounded-8 top-10 d-block mb-5">
        <div className="container-fluid pe-0">
          <img className="nav-logo ms-lg-5 ms-2" src={Logo} alt="No Image" />
          <div>
            <img
              className="m-search me-md-4 me-3"
              src={Search}
              alt="No Image"
            />
            <img className="m-account me-md-3 me-2" src={Account} alt="" />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <img className="m-account" src={menu} alt="" />
              </span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse mt-3"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url}
                >
                  Home
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link className="nav-link text-primary-theme pe-1 font-nav" to={app_url + 'events'}>
                  Events
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url + 'aboutus'}
                >
                  About Us
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <Link
                  className="nav-link text-primary-theme pe-1 font-nav"
                  to={app_url + 'contact'}
                >
                  Contact Us
                  <img className="nav-plus" src={plus} alt="" />
                </Link>
              </li>
              <li className="nav-item border rounded border-primary align-self-start px-2 my-1">
                <Link
                  className="nav-link text-primary-theme pt-1 pb-1p font-nav"
                  to={app_url + 'auth/organizer/signup'}
                >
                  List your event
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">

                {customer_token || organizername ? (
                  <>
                    {customer_token ? (
                      <Link
                        className="nav-link text-primary-theme pe-1 font-nav"
                        to={customer_url + "dashboard"}
                      >
                        My account
                        <img className="nav-plus" src={plus} alt="" />
                      </Link>
                    ) : (
                      <></>
                    )}
                    {organizername ? (
                      <Link
                        className="nav-link text-primary-theme pe-1 font-nav"
                        to={organizer_url + "dashboard"}
                      >
                        My account
                        <img className="nav-plus" src={plus} alt="" />
                      </Link>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <Link
                    className="nav-link text-primary-theme pe-1 font-nav"
                    to={app_url + 'auth/login-signup'}
                  >
                    Login/Sign Up
                    <img className="nav-plus" src={plus} alt="" />
                  </Link>
                )}

              </li>
              <li className="nav-item d-flex align-items-center justify-content-start">
                <a
                  className="nav-link text-primary-theme pe-1 font-nav"
                  href="contact-us.html"
                >
                  Location
                  <img className="nav-plus" src={plus} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
