import React from "react";
import india from "./assets/india.svg";
import singapore from "./assets/singapore.svg";
import USA from "./assets/USA.svg";
import arrow from "./assets/arrow.svg";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import location from "./assets/location (5) 1.svg";
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
const Contact = () => {
  return (
    <>
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-uppercase fw-bold pb-0 animate__animated animate__bounce">
          Contact Us
        </h1>
        <div className="banner-child bg-white p-3">
          <div className="contact-sec m-2">
            <form className="px-lg-5 px-4 py-4">
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control line-field"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control line-field"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control line-field"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="form-control line-field"
                      placeholder="+1 012 3456 789"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <p className="text-primary-color fw-bold mb-3">Select Subject?</p>
                  <div className="d-flex flex-md-row flex-column">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input  rounded-circle"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" for="flexCheckDefault">
                        General Inquiry
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        className="form-check-input  rounded-circle"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" for="flexCheckDefault">
                        General Inquiry
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        className="form-check-input  rounded-circle"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" for="flexCheckDefault">
                        General Inquiry
                      </label>
                    </div>
                    <div className="form-check me-3">
                      <input
                        className="form-check-input  rounded-circle"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" for="flexCheckDefault">
                        General Inquiry
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="mb-3 mt-lg-0 mt-3">
                    <label for="exampleInputEmail1" className="form-label">
                      Message
                    </label>
                    <input
                      type="number"
                      className="form-control line-field"
                      placeholder="Write your message."
                    />
                  </div>
                </div>
              </div>
              <button
                style={{ width: "100px" }}
                className="btn btn-primary text-capitalize py-0 px-0 d-flex rounded-6 align-items-center news-button mt-3"
              >
                <small className="ms-2">SEND</small>
                <div className="bg-ligh-blue rounded-6 h-100 d-flex align-items-center px-2 ms-auto">
                  <img style={{ width: "15px" }} src={arrow} alt="" />
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-200"></div>
      <div className="address-sec banner-child-address py-5">
        <div className="d-flex justify-content-center">
          <img className="mx-lg-4 mx-2 animate__animated animate__bounce" src={india} alt="" />
          <img className="mx-lg-4 mx-2 animate__animated animate__bounce" src={singapore} alt="" />
          <img className="mx-lg-4 mx-2 animate__animated animate__bounce" src={USA} alt="" />
        </div>
        <div className="contact-sec w-500 m-auto px-5 py-4 mt-4">
          <div>
            <span className="text-primary-color text-uppercase fw-bold">Address:</span>
            <span>
              Office, Vijay Chambers, Grant Road, Mumbai, Maharashtra 400004
            </span>
          </div>
          <div>
            <span className="text-primary-color text-uppercase fw-bold">Email</span>
            <span>tixme.tix@gmail.com</span>
          </div>
          <div>
            <span className="text-primary-color text-uppercase fw-bold">Phone</span>
            <span>+91 8080000007 (WhatsApp)</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
