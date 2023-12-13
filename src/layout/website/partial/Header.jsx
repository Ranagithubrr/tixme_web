import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LocationsIcon from "../../../common/icon/locations.svg";
import Locationstart from "../../../common/icon/whitestart.svg";
import PersonIcon from "../../../common/icon/person 1.svg";
import AppLogo from "../../../common/logo.svg";
import WhitestarBtn from "../../../component/Whitestarbtn";
import WhipersonBtn from "../../../component/Whiteuserbtn";
import Rectangle from "../../../common/image/Rectangle.png";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { app_url, organizer_url, customer_url } from "../../../common/Helpers";
import Mobilemenu from "../../../component/mobilemenu";
import Whitestar from "../../../common/icon/whitestart.svg";
// import MapContainer from "./mapContainer";
const Header = () => {
  const customer_token = localStorage.getItem("userauth");
  const organizer_token = localStorage.getItem("organizerauth");
  const accountTargetUrl = customer_token
    ? customer_url + "dashboard"
    : organizer_token
    ? organizer_url + "dashboard"
    : app_url + "auth/customer/login";
  return (
    <>
      <header className="only-pc">
        <Container fluid className="rectangle_bg_pos">
          <Row className="">
            <Col md={12}>
              <img className="rectangle_bg" src={Rectangle} alt="" />
            </Col>
            <Col md={12} className="pt-3 pb-3 bg-white">
              <ul className="website_top_menu float-right">
                <li className="nav-item">
                  <Link to={app_url}>
                    <img className="header-logo mobile-screen" src={AppLogo} />
                  </Link>
                </li>
                <li className="nav-item mob-sc-css-head-btn-mar">
                  <Link to={organizer_url + "dashboard"}>
                    <WhitestarBtn title={"Location"} />
                    {/* <WhitestarBtn title={<MapContainer />} /> */}
                  </Link>
                </li>
                <li className="nav-item header-btn-res">
                  {customer_token || organizer_token ? (
                    <>
                      {customer_token ? (
                        <Link
                          className="button-join"
                          to={customer_url + "dashboard"}
                        >
                          <WhipersonBtn title={"My Account"} />
                        </Link>
                      ) : (
                        <></>
                      )}
                      {organizer_token ? (
                        <Link
                          className="button-join"
                          to={organizer_url + "dashboard"}
                        >
                          <WhipersonBtn title={"My Account"} />
                        </Link>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <Link
                      className="button-join"
                      to={app_url + "auth/customer/login"}
                    >
                      <WhipersonBtn title={"Login"} />
                    </Link>
                  )}
                </li>
              </ul>
            </Col>
            <Col md={4} className="p-0">
              <div className="float-left">
                <Link to={app_url}>
                  <span>
                    <img className="header-logo big-screen" src={AppLogo} />
                  </span>
                </Link>
              </div>
            </Col>
            <Sidebar className="header-sidebar-style" />
          </Row>
        </Container>
      </header>
      <header className="only-mobile">
        <div className="header-item-overlay"></div>
        <div className="header-container">
          <div className="header-item-hamburger">
            <Mobilemenu />
          </div>
          <div className="header-items">
            <Link to={app_url}>
              <img className="mobile-screen" src={AppLogo} alt="App Logo" />
            </Link>
          </div>
          <div className="header-items">
            <div className="header-icons">
              <Link to={organizer_url + "dashboard"}>
                <img height={16} width={16} src={Whitestar} />
              </Link>
            </div>
            <div className="header-icons">
              <Link className="button-join" to={accountTargetUrl}>
                <img
                  height={30}
                  width={30}
                  src={PersonIcon}
                  alt="Person Icon"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
