import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Timelogo from "../../../common/icon/time 1.svg";
import withReactContent from 'sweetalert2-react-content';
import LocationIcon from "../../../common/icon/location.svg";
import Eimg from '../../../common/icon/Edit.svg';
import Hourglasslogo from "../../../common/icon/hourglass.svg";
import EditPng from '../../../common/icon/Edit.png';
import DateIcon from "../../../common/icon/date 2.svg";
import { apiurl, imgurl, admin_url, organizer_url, shortPer, onlyDayMonth } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const MySwal = withReactContent(Swal);
    function CheckDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to delete?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Delete(id)
            } else if (result.isDenied) {

            }
        })
    }
    const Delete = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id,
                isdelete: 1
            };
            fetch(apiurl + 'category/delete-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success('Deleted successfully');
                        fetchmyEvent();
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false)
        }
    }
    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            const requestData = {
                id: organizerid,
            };
            fetch(apiurl + 'event/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    }
                    setLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false)
        }
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
                        setCategoryList(data.data);
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
    const EditEvent = async (id, name) => {
        navigate(`${organizer_url}event/edit-event/${id}/${name}`);
    }
    useEffect(() => {
        fetchmyEvent();
        fetchCategory();
    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            <Row>
                                                <Col md={5}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input type="text" class="form-control" placeholder="Search events" />
                                                    </div>
                                                </Col>
                                                <Col md={3}>
                                                    <button className="w-100 theme-btn-warning" onClick={() => navigate(organizer_url + 'event/add-event')}>
                                                        <span>Mange All Attendee</span>
                                                    </button>
                                                </Col>
                                                <Col md={2}></Col>
                                                <Col md={2}>
                                                    <button className="w-100 theme-btn" onClick={() => navigate(organizer_url + 'event/add-event')}>
                                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Add Ticket</span>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <>
                                                {Listitems.length > 0 ? (
                                                    <>
                                                        {Listitems.map((item, index) => (
                                                            <Col md={12} className="event_list_box_main">
                                                                <button className="list-rais-ticket-btn" type="button">Raise Ticket</button>
                                                                <button className="list-active-ticket-btn" type="button">Active</button>
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <img src={item.thum_image ? imgurl + item.thum_image : Eimg} className="list-thum-img" alt="" />
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <span className="list-event-name">{item.name}</span> <span className="cursor-pointre list-event-edit-btn"><img onClick={() => EditEvent(item._id, item.name)} src={EditPng} alt="" /></span>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.event_desc, 100)}</p>
                                                                            </div>
                                                                            <div className="list-event-location">
                                                                                <div className="d-flex align-items-center text-center location-name">
                                                                                    <img
                                                                                        height={30}
                                                                                        width={30}
                                                                                        src={LocationIcon}
                                                                                        alt=""
                                                                                    />{" "}
                                                                                    <span>{item.location}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="desc_data">
                                                                                <div className="organizer-name-sec px-2 py-2">
                                                                                    <div className="d-inline-flex align-items-center border-right event-time-area">
                                                                                        <div className="d-inline-block mr-1">
                                                                                            <img height={30} width={30} src={Timelogo} alt="" />
                                                                                        </div>
                                                                                        <div className="d-inline-block">
                                                                                            <span className="event-duration d-block">
                                                                                                Event Time
                                                                                            </span>
                                                                                            <span className="event-time d-block">{item.start_time}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-inline-flex align-items-center">
                                                                                        <div className="d-inline-block mr-1">
                                                                                            <img
                                                                                                height={30}
                                                                                                width={30}
                                                                                                src={Hourglasslogo}
                                                                                                alt=""
                                                                                            />
                                                                                        </div>
                                                                                        <div className="d-inline-block">
                                                                                            <span className="event-duration d-block">
                                                                                                Event Duration
                                                                                            </span>
                                                                                            <span className="event-time d-block">2Hr 11Min</span>
                                                                                        </div>
                                                                                        {item.allprice ? (
                                                                                            <>
                                                                                                <div className="list-ticket-count">
                                                                                                    <p className="mb-0 list-Total-Ticket">Total Ticket</p>
                                                                                                    <span className="list-Ticket-amount">{item.orderCount} / {item.allprice.reduce((total, price) => total + parseInt(price.quantity, 10), 0)}</span> <span className="list-Ticket-sold">SOLD</span>
                                                                                                </div>
                                                                                            </>
                                                                                        ) : ''}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div>
                                                                                <div className="text-end mr-5">
                                                                                    <span className="list-event-category-img">{item.category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                    <span className="mb-5">
                                                                                        <img src={DateIcon} alt="" />
                                                                                        <span className="on-img-date-val">{onlyDayMonth(item.start_date)}</span>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="text-end mr-5">
                                                                                    <p className="mb-0 mr-5 list-Ticket-1">Ticket</p>
                                                                                    <button className="btn btn-success list-Ticket-mng-1" type="button" onClick={() => navigate(`${organizer_url}event/manage-ticket/${item.id}/${item.name}`)}>Manage</button>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <div class="no-data-box">
                                                        <p>No Data Found !</p>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >

        </>
    )
}
export default Dashboard;