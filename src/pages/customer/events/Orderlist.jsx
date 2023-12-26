import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import Searchicon from '../../../common/icon/searchicon.png';
import Norecord from '../../../component/Norecordui';
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Eimage from "../../../common/image/eimage.png";
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
import ArrowPng from "../../../common/icon/Arrow.svg";
import TranferImg from "../../../common/image/Tranfer.svg";
import { apiurl, imgurl, admin_url, organizer_url, shortPer, onlyDayMonth, app_url } from '../../../common/Helpers';
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";

import QRCode from 'react-qr-code';
import QRsuccess from '../../../common/icon/qr-code-pay.png';
import { FaCircleCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [ModalLoader, setModalLoader] = useState(true);
    const navigate = useNavigate();
    const [Listitems, setListitems] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const Beartoken = localStorage.getItem('userauth');

    const [Ordersavedata, setOrdersavedata] = useState();
    const [Orderitemlist, setOrderitemlist] = useState();
    const [OrderData, setOrderData] = useState();
    const [CustomerData, setCustomerData] = useState();
    const [Isscan, setIsscan] = useState(false);
    const [modal, setModal] = useState(false);
    const [ShowQr, setShowQr] = useState(false);

    const [modalTT, setModalTT] = useState(false);
    const [Transferid, setTransferid] = useState();

    const MySwal = withReactContent(Swal);

    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    };

    const fetchmyEvent = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'order/customer/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
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
            console.error('Api error:', error);
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
                        const transformedCategories = data.data.map(category => ({
                            value: category._id,
                            label: category.name
                        }));
                        setCategoryList(transformedCategories);
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
    const fetchOrderData = async (id) => {
        try {
            setModalLoader(true);
            setShowQr(false);
            const requestData = {
                id: id
            };
            fetch(apiurl + 'order/get-order-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setOrdersavedata(data.data.ordersavedata);
                        setOrderitemlist(data.data.orderitemlist);
                        if (data.data.orderitemlist.length > 0) {
                            const check = data.data.orderitemlist.every(item => item.scan_status === 1);
                            setIsscan(check);
                        } else {
                            setIsscan(false);
                        }
                        setOrderData(data.data.orderData);
                        setCustomerData(data.data.customerData);
                    }
                    setModalLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setModalLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setModalLoader(false);
        }
    }
    useEffect(() => {
        fetchmyEvent();
        fetchCategory();
    }, []);

    const [SelectCategoryValue, setSelectCategoryValue] = useState();
    const HandelselectCategory = (selectedValue) => {
        setSelectCategoryValue(selectedValue);
    };
    const CategoryOption = [
        {
            options: CategoryList
        }
    ]

    return (
        <>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} centered size={'xl'}>
                <ModalHeader toggle={!modal}>Order Details</ModalHeader>
                <ModalBody>
                    <Row>
                        {ModalLoader ? (
                            <>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                                <Col md={4}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">Email :</h5>
                                        <p>{CustomerData.email}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Phone :</h5>
                                        <p>{CustomerData.phone_number}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Address :</h5>
                                        <p>{CustomerData.address} {CustomerData.address ? (',' + CustomerData.address) : ''}</p>
                                    </div>
                                </Col>
                                <Col md={2} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">City :</h5>
                                        <p>{CustomerData.city ? CustomerData.city : '--'}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">State :</h5>
                                        <p>{CustomerData.state ? CustomerData.state : '--'}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">Country :</h5>
                                        <p>{CustomerData.country ? CustomerData.country : '--'}</p>
                                    </div>
                                </Col>
                                <Col md={3} className="tickets-data-text">
                                    <div>
                                        <h5 className="text-bold">BOOKING ID :</h5>
                                        <p>{Ordersavedata.bookingid}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">TYPE :</h5>
                                        <p>{Ordersavedata.order_amount && Ordersavedata.order_amount > 0 ? 'Paid' : 'Free'}</p>
                                    </div>
                                    <div>
                                        <h5 className="text-bold">total Ticket :</h5>
                                        <p>{Orderitemlist.length}</p>
                                    </div>
                                    {Orderitemlist.length > 0 ? (
                                        <div>
                                            {ShowQr ? (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">Hide All Scanners</button>
                                            ) : (
                                                <button className="btn btn-success list-Ticket-mng-1" onClick={() => setShowQr(!ShowQr)} type="button">View All Scanners</button>
                                            )}
                                        </div>
                                    ) : ''}
                                </Col>
                                <Col md={4}>
                                    <div className="tickets-data-text-last">
                                        <h4 style={{ fontWeight: '700' }}>Tickect Scan Status</h4>
                                        {Isscan ? (
                                            <span class="badge-theme-success badge-theme"><FaCircleCheck /> Success</span>
                                        ) : (
                                            <span class="badge-theme-warning badge-theme"><FaClock /> Pending</span>
                                        )}
                                    </div>
                                </Col>
                                {ShowQr ? (
                                    <Col md={12}>
                                        <Row className="pt-2 mt-4" style={{ borderTop: '1px solid #eee' }}>
                                            {Orderitemlist.map((item, index) => (
                                                <Col md={3}>
                                                    <div className="ticket-box">
                                                        <div className="ticket-qr text-center">
                                                            {item.is_transfer == 1 ? (
                                                                <div class="alert alert-primary alert-dismissible fade show">
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                                                    Transferred to <span className="font-capitalize"> {item.owner_name} </span>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center">
                                                                    {item.scan_status == 0 ? (
                                                                        <>
                                                                            <QRCode style={{ height: "auto", width: "150px" }} value={JSON.stringify({ id: item._id, time: generateRandomNumber(), index: index })} />
                                                                            <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                            <span class="mt-0 badge-theme-warning badge-theme mt-3 mb-3 d-block w-100"><FaClock /> Pending</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <img style={{ height: "auto", width: "150px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                                            <p className="mb-0 mt-4" style={{ fontWeight: 600, color: '#000' }}>Scan status</p>
                                                                            <span class="mt-0 badge-theme-success badge-theme mt-3 mb-3 d-block w-100"><FaCircleCheck /> Success</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                                ) : ''}
                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
            <Modal isOpen={modalTT} toggle={() => setModalTT(!modalTT)} centered size={'lg'}>
                <ModalHeader toggle={!modalTT}>Order Details</ModalHeader>
                <ModalBody>
                    <Row>
                        {ModalLoader ? (
                            <>
                                <Col md={6}><div className="linear-background w-100"> </div></Col>
                                <Col md={6}><div className="linear-background w-100"> </div></Col>
                            </>
                        ) : (
                            <>
                                <Col md={6}>
                                    <h3 style={{ fontWeight: '600', color: '#0047AB' }} className="mb-4">Transfer Ticket</h3>
                                    <div class="input-group input-warning-o">
                                        <input type="text" class="form-control px-2 py-3 mb-3"  placeholder="Email Id" />
                                    </div>
                                    <div>
                                        <label>Total Ticket Quantity</label>
                                        <input type="text" max={Orderitemlist.length} class="form-control px-2 py-3 mb-5" placeholder="Enter Ticket Quantity" />
                                    </div>
                                    <div>
                                        <h5 className="text-bold">total Ticket :</h5>
                                        <p>{Orderitemlist.length}</p>
                                    </div>
                                    {Orderitemlist.length > 0 ? (
                                        <div className="mr-5 pt-5">
                                            <button className="mb-0 mr-5  btn btn-success list-Ticket-mng-1" type="button">Transfer Ticket</button>
                                        </div>
                                    ) : (
                                        <div className="mr-5 pt-5">
                                            <button disabled className="mb-0 mr-5 btn btn-dark list-Ticket-mng-1" type="button">No Ticket Found</button>
                                        </div>
                                    )}
                                </Col>
                                <Col md={6}>
                                    <img className="TranferImg-css" src={TranferImg}></img>
                                </Col>
                            </>
                        )}
                    </Row>
                </ModalBody>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12} style={{ position: 'relative', zIndex: '2' }}>
                                            <Row>
                                                <Col md={3}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input type="text" class="form-control" placeholder="Search events" />
                                                    </div>
                                                </Col>
                                                <Col md={3} className="react-select-h mb-3">
                                                    <Select
                                                        isClearable={false}
                                                        options={CategoryOption}
                                                        className='react-select'
                                                        classNamePrefix='select'
                                                        placeholder='Select Category'
                                                        onChange={HandelselectCategory}
                                                        value={SelectCategoryValue}
                                                    />
                                                    {/* <select name="" id="" className="theme-dropdown dropdown-custome category-select">
                                                        <option value=''>Category</option>
                                                        {CategoryList.map((item, index) => (
                                                            <option value={item._id}>{item.name}</option>
                                                        ))}
                                                    </select> */}
                                                </Col>
                                                <Col md={2}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text search-box-icon-1"><FiClock /></span>
                                                        <input type="text" class="form-control" placeholder="Date range" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text search-box-icon-1"><  FiFlag /></span>
                                                        <input type="text" class="form-control" placeholder="Status" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <button className="w-100 theme-btn" onClick={() => navigate(app_url + 'events')}>
                                                        <span className="theme-btn-icon"><FiPlus /></span> <span>Buy Tickets</span>
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
                                                                <button className="list-active-ticket-btn" onClick={() => { setModal(!modal); fetchOrderData(item._id) }} type="button">Ticket <img src={ArrowPng} className="arraw-svg ml-3" alt="" /></button>
                                                                <div className="event_list_box">
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            <img src={Eimage} className="list-thum-img" alt="" />
                                                                        </Col>
                                                                        <Col md={5} className="list-data">
                                                                            <div>
                                                                                <Link to={`${app_url}event/${item.eventData[0]._id}/${item.eventData[0].name}`}><span className="list-event-name">{item.eventData[0].name}</span></Link>
                                                                                <p className="list-event-desc mb-0">{shortPer(item.eventData[0].event_desc, 100)}</p>
                                                                            </div>
                                                                            <div className="list-event-location mb-3">
                                                                                <div className="d-flex align-items-center text-center location-name">
                                                                                    <img
                                                                                        height={30}
                                                                                        width={30}
                                                                                        src={LocationIcon}
                                                                                        alt=""
                                                                                    />{" "}
                                                                                    <span>{item.eventData[0].location}</span>
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
                                                                                            <span className="event-time d-block">{item.eventData[0].start_time}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="d-inline-flex align-items-center time-ticket-sold-box">
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
                                                                                            <span className="event-time d-block">{item.eventData[0].event_duration}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                        <Col md={3} className="py-3">
                                                                            <div className="mob-style">
                                                                                <div className="text-end mr-5">
                                                                                    <span className="list-event-category-img">{item.eventData[0].category_name}</span>
                                                                                </div>
                                                                                <div className="text-end mr-5 mt-3 mb-3">
                                                                                    <span className="mb-5">
                                                                                        <img src={DateIcon} alt="" />
                                                                                        <span className="on-img-date-val">{item.eventData[0].start_date}</span>
                                                                                    </span>
                                                                                </div>
                                                                                <div className="text-end mr-5 pt-4">
                                                                                    <button onClick={() => { setModalTT(!modalTT); fetchOrderData(item.id) }} className="mb-0 mr-5  btn btn-success list-Ticket-mng-1" type="button">Transfer Ticket</button>
                                                                                </div>
                                                                            </div>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <Norecord />
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