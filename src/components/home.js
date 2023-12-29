import React, { useEffect, useState } from "react";
import dropdown from "./assets/dropdown.svg";
import card from "./assets/card.png";
import calendar from "./assets/calendar.svg";
import eventLogo from "./assets/eventLogo.svg";
import clock from "./assets/clock.svg";
import hourglass from "./assets/hourglass.svg";
import google from "./assets/google.svg";
import airBNB from "./assets/airBNB.svg";
import booking from "./assets/booking.com.svg";
import expedia from "./assets/expedia.svg";
import TUI from "./assets/TUI.svg";
import arrow from "./assets/arrow.svg";
import Logo from "./assets/Logo.svg";
import Search from "./assets/search.png";
import Account from "./assets/account.svg";
import menu from "./assets/menu.svg";
import plus from "./assets/plus.svg";
import location from "./assets/location (5) 1.svg";
import music from "./assets/music.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from './footer';
import HeaderMenu from './headermenu';
import MobileMenu from './mobilemenu';
import Alert from 'react-bootstrap/Alert';
import Arts from '../common/category/Group 1171274918.svg';
import Business from '../common/category/Group 1171274915.svg';
import Food from '../common/category/Group 1171274941.svg';
import Music from '../common/category/Group 1171274913.svg';
import NIGHTLIFE from '../common/category/Group 1171274914.svg';
import Sports from '../common/category/Group 1171274916.svg';

import { apiurl, onlyDayMonth, shortPer, app_url } from "../common/Helpers";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  
  const [Eventlist, setEventlist] = useState([]);
  const [Eventloader, setEventloader] = useState(false);
  const [Listitems, setListitems] = useState([]);
  const [filtercategory, setFilterCategory] = useState('');
  const countryName = localStorage.getItem("countryname");

  const viewEvent = async (id, name) => {
    navigate(`${app_url}event/${id}/${name}`)
  }
  const fetchEvent = async () => {
    try {
      setEventloader(true)
      const requestData = {
        limit: 10,
        organizerid: null,
        country: countryName ? null : null,
        category: filtercategory ? filtercategory : null
      }
      fetch(apiurl + "website/all-events-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to JSON
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            setEventlist(data.data);
          } else {
          }
          setEventloader(false)
        })
        .catch((error) => {
          console.error("Insert error:", error);
          setEventloader(false)
        });
    } catch (error) {
      console.error("Login api error:", error);
      setEventloader(false)
    }
  };
  const fetchCategory = async () => {
    try {
      fetch(apiurl + 'category/get-category-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header to JSON
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success == true) {
            setListitems(data.data);

          } else {

          }
        })
        .catch(error => {
          console.error('Insert error:', error);
        });
    } catch (error) {
      console.error('Api error:', error);
    }
  }
  useEffect(() => {
    fetchEvent();
    fetchCategory();
  }, [filtercategory, countryName]);

  const CategoryImage = [
    { image: NIGHTLIFE },
    { image: Arts },
    { image: Food },
    { image: Sports },
    { image: Business },
    { image: Music },
    { image: NIGHTLIFE },
  ];
  const filteredList = Listitems.filter(item => item.is_homepage === 1);

  return (
    <>
      {" "}
      <HeaderMenu />
      <div className="mx-lg-4 my-lg-3 banner bg-primary-color rounded-8 position-relative">
        <MobileMenu />
        <h1 className="banner-h text-white text-start text-uppercase">Beyond Tickets :</h1>
        <h3 className="banner-h2 text-white rounded-8 px-4 py-3 animate__animated animate__bounce">
          Your Passport to Eventful Experiences
        </h3>
        <div className="banner-child bg-white">
          <h5 className="text-primary-color fw-bold space-sec pt-4 animate__animated animate__bounce">
            Find Near By Events
          </h5>
          <div className="d-flex space-sec2 flex-lg-row flex-column mt-lg-0 mt-3">
            <select
              className="form-select category me-4"
              style={{width: '30%'}}
              aria-label="Default select example"
            >
              <option value=''>Any</option>
              {Listitems.map((item, index) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
            <input
              type="search"
              id="form1"
              className="form-control border-b5 mt-lg-0 mt-3"
              placeholder="Search anything"
            />
          </div>
          <div className="row mx-lg-3 mx-1 mb-4 mt-4 gx-md-4 gx-2">
            <div>
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                breakpoints={{
                  992: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
                className="mySwiper"
              >
                {filteredList.map((item, index) => (
                  <SwiperSlide>
                    <div className="text-center position-relative">
                      <div className="event-card pt-4">
                        <img onClick={() => setFilterCategory(item._id)} className="event-img  animate__animated animate__bounce" src={CategoryImage[index].image} alt="" />
                        <small className="d-block text-card-color my-2 mt-3"> {item.name} </small>
                      </div>
                      <div className="fade-effect"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
      <div className="event-sec mx-4">
        <div className="d-flex align-items-start justify-content-start">
          <h5 className="event-h fw-bold mx-head pt-4 me-4">Events In</h5>
          <div className="d-flex align-items-center justify-content-start ms-2 border-bttom-dotted">
            <img className="nav-plus pt-1 mt-2 me-2" src={dropdown} alt="" />
            <h5 className="text-primary-color fw-bold pt-4 me-4 mb-1">Boston</h5>
          </div>
        </div>
        <div className="row px-0 mt-lg-5 mt-2 gx-lg-5 gy-4 mx-cards my-margen">
          {Eventloader ? (
            <>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
              <div className="mb-5 col-md-4">
                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
              </div>
            </>
          ) : (
            <>
              {Eventlist.length > 0 ? (
                <>
                  {Eventlist.map((item, index) => (
                    <div className="col-xl-4 col-md-6 col-12" onClick={() => viewEvent(item._id, item.name)}>
                      <div className="bg-white rounded-10 shadow-bottom">
                        <img className="event-card-img" src={card} alt="" />
                        <div className="d-flex align-items-center justify-content-end mt-n4 me-3">
                          <img className="card-icon me-2" src={calendar} alt="" />
                          <p className="text-primary-color fw-bold me-lg-4 me-lg-3 me-0 mb-0 mt-md-0">
                            {onlyDayMonth(item.start_date)}
                          </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start border-bttom-dotted w-origin ms-3 mt-1 pb-2">
                          <img className="card-icon-logo me-2" src={eventLogo} alt="" />
                          <div className="d-flex flex-column align-items-start justify-content-start">
                            <small className="small mb-0">Originated by</small>
                            <p className="text-primary-color fw-bold me-lg-4 me-lg-3 me-1 mb-0 mt-n1">
                              By {item.organizer_name}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center justify-content-start me-3 ms-3 my-2">
                            <img className="card-icon me-1" src={location} alt="" />
                            <p className="text-primary-color fw-bold me-lg-4 me-lg-3 me-1 mb-0">
                              {item.location}
                            </p>
                          </div>
                          <div className="bg-fade rounded p-lg-2 p-1 me-3">
                            <p className="small fw-bold mb-0 pb-0">Onwards</p>
                            <div className="d-flex align-items-baseline">
                              <p className="text-dark fw-bold mb-0 pb-0 line-through me-1">
                                {item.countrysymbol} {item.displaycutprice}
                              </p>
                              <p className="text-primary-color fw-bold me-1 pr-3 mb-0 price">
                                {item.countrysymbol} {item.displayprice}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start align-items-start">
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2 border-end pe-3"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={clock} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Time
                              </p>
                              <p className="small mb-0">{item.start_time}</p>
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-start w-origin ms-3 pb-2"
                            style={{ flexShrink: 0, width: "auto" }}
                          >
                            <img className="card-icon2 me-2" src={hourglass} alt="" />
                            <div>
                              <p className="small text-primary-color fw-bold mb-0 pb-0">
                                Event Duration
                              </p>
                              <p className="small mb-0">{item.event_duration}</p>
                            </div>
                          </div>
                        </div>
                        <div className="desc-h ms-3 fw-bold mb-0">{item.display_name}</div>
                        <p className="desc mx-3 pb-3">
                          {shortPer(item.event_desc, 100)}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="col-md=12">
                    <Alert variant="danger">
                      No records available for the specified category
                    </Alert>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="count-sec">
        <div className="row">
          <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
            <div className="border-end bottom-line border-primary pb-md-0 pb-4">
              <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">EVENT HOSTED</h6>
              <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
            </div>
          </div>
          <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
            <div className="border-end bottom-line border-primary pb-md-0 pb-4">
              <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">Ticket Sold</h6>
              <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
            </div>
          </div>
          <div className="col-md-4 text-center pt-4 pb-md-5 pb-0">
            <div>
              <h6 className="fw-bold text-primary-color mb-0 animate__animated animate__bounce">
                Partners & Organizers
              </h6>
              <p className="mb-0 fs-3 text-primary-color fw-bold">6067+</p>
            </div>
          </div>
        </div>
      </div>
      <div className="partner-sec">
        <h3 className="fw-bold text-primary-color mb-0 text-center mb-0 animate__animated animate__bounce">
          OUR PARTNER
        </h3>
        <div className="mt-lg-5 mt-4 pt-xl-5 pt-md-2 pt-5 pb-5 d-flex justify-content-center align-items-center">
          <img className="partner-img me-5" src={google} alt="" />
          <img className="partner-img me-md-5" src={airBNB} alt="" />
          <img
            className="partner-img me-5 d-lg-block d-none"
            src={booking}
            alt=""
          />
          <img
            className="partner-img me-5 d-md-block d-none"
            src={expedia}
            alt=""
          />
          <img
            className="partner-img me-5 d-md-block d-none tui"
            src={TUI}
            alt=""
          />
        </div>
      </div>
      <div className="newsletter-sec pb-4 position-relative">
        <div className="position-absolute md-absolute news-form">
          <h5 className="fw-bold text-primary-color mb-0 pt-2 animate__animated animate__bounce">
            Want to receive events & news and updates?
          </h5>
          <div className="d-flex mt-4 flex-md-row flex-column">
            <input
              className="w-auto form-control rounded me-md-3 me-5 mb-md-0 mb-3"
              type="text"
              name=""
              id=""
              placeholder="Name"
            />
            <input
              className="w-auto form-control rounded me-md-0 me-5"
              type="text"
              name=""
              id=""
              placeholder="Email ID"
            />
          </div>
          <div className="form-check mt-3 mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" for="flexCheckDefault">
              I agree with the{" "}
              <span className="text-primary-color">privacy statement</span>
            </label>
          </div>
          <button className="btn btn-primary text-capitalize py-0 px-0 d-flex rounded-6 align-items-center news-button">
            <small className="ms-2"> Get the latest updates </small>
            <div className="bg-ligh-blue rounded-6 h-100 d-flex align-items-center px-2 ms-auto">
              <img style={{ width: "15px" }} src={arrow} alt="" />
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;