import React, { useEffect, useState } from "react";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Norecord from '../../../component/Norecordui';
import QRsuccess from '../../../common/icon/qr-code-pay.png';
import toast from 'react-hot-toast';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { FiDownloadCloud } from "react-icons/fi";
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
import QRCode from 'react-qr-code';
import { FaRegCreditCard } from "react-icons/fa";
import Searchicon from '../../../common/icon/searchicon.png';
import { apiurl, shortPer } from '../../../common/Helpers';
import Table from 'react-bootstrap/Table';
import { FaCircleCheck } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [ModalLoader, setModalLoader] = useState(true);
    const [Listitems, setListitems] = useState([]);

    const [Ordersavedata, setOrdersavedata] = useState();
    const [Orderitemlist, setOrderitemlist] = useState();
    const [OrderData, setOrderData] = useState();
    const [CustomerData, setCustomerData] = useState();
    const [Isscan, setIsscan] = useState(false);
    const { id, name } = useParams();
    const [modal, setModal] = useState(false);
    const [ShowQr, setShowQr] = useState(false);
    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    };
    const fetchOrders = async () => {
        try {
            setLoader(true);
            const requestData = {
                eventid: id
            };
            fetch(apiurl + 'order/event/orders-list', {
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
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            toast.error(error);
            setLoader(false);
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
        fetchOrders();
    }, []);
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
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-1 grey-bg">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={6}>
                                            <h3>{name}</h3>
                                        </Col>
                                        <Col md={6} className="text-end">
                                            <button className="theme-btn-light px-2 mr-3">
                                                <span className="theme-btn-icon"><FiDownloadCloud /></span> <span>Export</span>
                                            </button>
                                            <button className="theme-btn px-2">
                                                <span className="theme-btn-icon"><FiPlus /></span> <span>Add Attendee</span>
                                            </button>
                                        </Col>
                                        <Col md={12} className="py-3">
                                            <Row>
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
                                                <Col md={3}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text search-box-icon-1"><FaRegCreditCard /></span>
                                                        <input type="text" class="form-control" placeholder="Ticket Type" />
                                                        <span class="input-group-text search-box-icon-1"><FiChevronDown /></span>
                                                    </div>
                                                </Col>
                                                <Col md={5}>
                                                    <div class="input-group mb-3 input-warning-o">
                                                        <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                        <input type="text" class="form-control" placeholder="Search by amount , payment method..." />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        {Loader ? (
                                            <div className="linear-background w-100"></div>
                                        ) : (
                                            <>
                                                {Listitems ? (
                                                    <Col md={12} className="white-table">
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th className="text-center" key={1}>Name</th>
                                                                    <th className="text-center" key={1}>Booking ID</th>
                                                                    <th className="text-center" key={1}>Status</th>
                                                                    <th className="text-center" key={1}>Amount</th>
                                                                    <th className="text-center" key={1}>TYPE</th>
                                                                    <th className="text-center" key={1}>Creation date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Listitems.map((item, index) => (
                                                                    <tr>
                                                                        <td>{item.customer_name}</td>
                                                                        <td>{shortPer(item.bookingid, 20)}</td>
                                                                        <td>
                                                                            {item.status == 0 ? (
                                                                                <><span class="badge-theme-warning badge-theme"><FaClock /> Pending</span></>
                                                                            ) : ''}

                                                                            {item.status == 1 ? (
                                                                                <><span class="badge-theme-success badge-theme"><FaCircleCheck /> Success</span></>
                                                                            ) : ''}

                                                                            {item.status == 2 ? (
                                                                                <><span class="badge-theme-danger badge-theme"><FaCircleMinus /> Declined</span></>
                                                                            ) : ''}

                                                                        </td>
                                                                        <td>
                                                                            {item.order_amount && item.order_amount > 0 ? (
                                                                                <>{item.currency} {item.order_amount}</>
                                                                            ) : (
                                                                                'Free'
                                                                            )}
                                                                        </td>
                                                                        <td>
                                                                            {item.order_amount && item.order_amount > 0 ? (
                                                                                'Paid'
                                                                            ) : (
                                                                                'Free'
                                                                            )}
                                                                        </td>
                                                                        <td>{item.date} {item.time} <span onClick={() => { setModal(!modal); fetchOrderData(item._id) }} className="order-view-btn"><FaChevronDown /></span></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    </Col>
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
            </div>
        </>
    )
}
export default Dashboard;