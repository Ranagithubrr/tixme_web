import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Eventlogo from "../../common/icon/eventlogo.svg";
import Timelogo from "../../common/icon/time 1.svg";
import Hourglasslogo from "../../common/icon/hourglass.svg";
import LocationIcon from "../../common/icon/location.svg";
import Eventimg from "../../common/event.jpg";
import { useNavigate } from "react-router-dom";
import DateIcon from "../../common/icon/date 2.svg";
import Fade from "react-reveal/Fade";
import { apiurl, onlyDayMonth, shortPer, app_url } from "../../common/Helpers";
import "./events.css"
const Events = () => {
    const [Listitems, setListitems] = useState([]);
    const [Eventlist, setEventlist] = useState([]);
    const [Eventloader, setEventloader] = useState(false);
    const [filtercategory, setFilterCategory] = useState('');
    const navigate = useNavigate();
    const viewEvent = async (id, name) => {
        navigate(`${app_url}event/${id}/${name}`)
    }
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
                        const allCategoryItem = { name: 'All', category: 'All' };
                        const updatedList = [allCategoryItem, ...data.data];
                        setListitems(updatedList);

                    } else {

                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error('Login api error:', error);
        }
    }
    const fetchEvent = async () => {
        try {
            setEventloader(true)
            const requestData = {
                limit: 10,
                organizerid: null,
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
    const categories = [
        'All', 'Arts & Theater', 'Business & Networking', 'Food & Drinks', 'Music', 'Nightlife', 'Sports & Fitness'
    ]
    useEffect(() => {
        fetchCategory();
        fetchEvent();
    }, []);
    useEffect(() => {
        fetchEvent();
    }, [filtercategory]);
    return (
        <div className='content-data'>
            <Container fluid className="body-container">
                <h1>Explore our events</h1>
                <Row>
                    <Col md={12}>
                        <div className="categories-container">
                            {
                                Listitems.map((item, index) => {
                                    const isFirstItem = filtercategory === item._id;
                                    const className = isFirstItem ? 'active hobby-box ' : 'hobby-box ';
                                    return <a className={className} onClick={() => setFilterCategory(item._id)} key={index}>{item.name}</a>;
                                })
                            }
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="event-category-section mb-5 in-event-page mt-5">
                            <Container fluid className="">
                                {Eventloader ? (
                                    <>
                                        <Row>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                            <Col md={4} className="mb-5">
                                                <div className="linear-background w-100" style={{ height: '400px' }}> </div>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        {Eventlist.length > 0 ? (
                                            <Row className="event-box-mobile">
                                                {Eventlist.map((item, index) => (
                                                    <Col md={4} className="mb-3 cursor-pointer" title="View" onClick={() => viewEvent(item._id, item.name)}>
                                                        <Fade bottom>
                                                            <div className="event-box-style">
                                                                <div className="event-image-part">
                                                                    <img className="event-image" src={Eventimg} alt="" />
                                                                    <span className="event-category-img">{item.category_name}</span>
                                                                    <span className="on-img-date">
                                                                        <img src={DateIcon} alt="" />
                                                                        <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="organizer-name-sec d-flex align-items-center px-2 py-2">
                                                                    <div className="d-inline-block mr-3">
                                                                        <img
                                                                            height={70}
                                                                            width={70}
                                                                            src={Eventlogo}
                                                                            alt=""
                                                                            className="organiger-logo"
                                                                        />
                                                                    </div>
                                                                    <div className="d-inline-block">
                                                                        <span className="organizer-by d-block">Organised by</span>
                                                                        <span className="organizer-name d-block">By {item.organizer_name}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="organizer-name-sec px-2 py-2">
                                                                    <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                        <div className="d-inline-block mr-1">
                                                                            <img height={30} width={30} src={Timelogo} alt="" />
                                                                        </div>
                                                                        <div className="d-inline-block">
                                                                            <span className="event-duration d-block">Event Time</span>
                                                                            <span className="event-time d-block">{item.start_time}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-inline-flex align-items-center">
                                                                        <div className="d-inline-block mr-1">
                                                                            <img height={30} width={30} src={Hourglasslogo} alt="" />
                                                                        </div>
                                                                        <div className="d-inline-block">
                                                                            <span className="event-duration d-block">
                                                                                Event Duration
                                                                            </span>
                                                                            <span className="event-time d-block">2Hr 11Min</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="event-name">
                                                                        <span>{item.display_name}</span>
                                                                        <p>
                                                                            {shortPer(item.event_desc, 100)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="ticket-price-area mt-3">
                                                                    <Row>
                                                                        <Col md={7} xs={7} className="border-top-doted">
                                                                            <div className="location d-flex align-items-center text-center">
                                                                                <img height={30} width={30} src={LocationIcon} alt="" />{" "}
                                                                                <span>{item.location}</span>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={5} xs={5}>
                                                                            <div className="price-section text-center">
                                                                                <p>Ticket Price</p>
                                                                                <span className="price">${item.displayprice}</span>
                                                                                <span className="cut-price">${item.displaycutprice}</span>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        </Fade>
                                                    </Col>
                                                ))}
                                            </Row>
                                        ) : (
                                            <>
                                                <Col md={12}>
                                                    <Alert variant="danger">
                                                        No records available for the specified category
                                                    </Alert>
                                                </Col>
                                            </>
                                        )}
                                    </>
                                )}
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Events;