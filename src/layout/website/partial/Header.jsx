import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationsIcon from '../../../common/icon/locations.svg';
import Locationstart from '../../../common/icon/whitestart.svg';
import PersonIcon from '../../../common/icon/person 1.svg';
import AppLogo from '../../../common/logo.svg';
import WhitestarBtn from '../../../component/Whitestarbtn';
import WhipersonBtn from '../../../component/Whiteuserbtn';
import Mapbutton from '../../../component/Mapbutton';
import Rectangle from '../../../common/image/Rectangle.png';
import { Link } from "react-router-dom";
import Sidebar from './Sidebar'
import { app_url, organizer_url, customer_url } from '../../../common/Helpers';
const Header = () => {
    const customer_token = localStorage.getItem('userauth');
    const organizer_token = localStorage.getItem('organizerid');
    const customer_name = localStorage.getItem('username');
    const organizer_name = localStorage.getItem('organizername');
    return (
        <>
            <header>
                <Container fluid className="rectangle_bg_pos">
                    <Row className="">
                        <Col md={12}>
                            <img className='rectangle_bg' src={Rectangle} alt="" />
                        </Col>
                        <Col md={12} className="pt-3 pb-3 bg-white">
                            <ul className="website_top_menu float-right">
                                <li className="nav-item">
                                    <Link to={app_url}><img className="header-logo mobile-screen" src={AppLogo} /></Link>
                                </li>
                                <li className="nav-item mob-sc-css-head-btn-mar">
                                    <Mapbutton title={'location'} />
                                </li>
                                <li className="nav-item header-btn-res">
                                    {customer_token || organizer_token ?
                                        (
                                            <>
                                                {customer_token ? (
                                                    <Link className="button-join" to={customer_url + 'dashboard'} >
                                                        <WhipersonBtn title={customer_name ? customer_name : 'My account'} />
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                                {organizer_token ? (
                                                    <Link className="button-join" to={organizer_url + 'dashboard'} >
                                                        <WhipersonBtn title={organizer_name ? organizer_name : 'My account'} />
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                            </>
                                        ) :
                                        (
                                            <Link className="button-join" to={app_url + 'auth/customer/login'}>
                                                <WhipersonBtn title={'Login'} />
                                            </Link>
                                        )
                                    }
                                </li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <div className="float-left">
                                <Link to={app_url}>
                                    <span>
                                        <img className="header-logo big-screen" src={AppLogo} />
                                    </span>
                                </Link>
                            </div>
                        </Col>
                        <Sidebar className='header-sidebar-style' />
                    </Row>
                </Container>
            </header >
        </>
    )
}
export default Header;