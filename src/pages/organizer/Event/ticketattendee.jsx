import React, { useEffect, useState } from "react";
import {
    Modal,
    Input,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import Norecord from '../../../component/Norecordui';
import toast from 'react-hot-toast';
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import { FiDownloadCloud } from "react-icons/fi";
import { FiPlus, FiFlag, FiClock, FiChevronDown } from "react-icons/fi";
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
    const [Listitems, setListitems] = useState([]);
    const { id, name } = useParams();
    const [modal, setModal] = useState(false);
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
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <>
            <Modal isOpen={modal} toggle={() => setModal(!modal)} centered size={'xl'}>
                <ModalHeader toggle={!modal}>Order Details</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={3} className="tickets-data-text">
                            <div>
                                <h5 className="text-bold">Email :</h5>
                                <p>user@gmail.com</p>
                            </div>
                            <div>
                                <h5 className="text-bold">Phone :</h5>
                                <p>909 0910 9202</p>
                            </div>
                            <div>
                                <h5 className="text-bold">Address :</h5>
                                <p>33 Robin Covington Road, Rockingham,nc, 28339 United States</p>
                            </div>
                        </Col>
                        <Col md={2} className="tickets-data-text">
                            <div>
                                <h5 className="text-bold">City :</h5>
                                <p>Rockingham</p>
                            </div>
                            <div>
                                <h5 className="text-bold">State :</h5>
                                <p>North Carolina</p>
                            </div>
                            <div>
                                <h5 className="text-bold">Country :</h5>
                                <p>United States</p>
                            </div>
                        </Col>
                        <Col md={3} className="tickets-data-text">
                            <div>
                                <h5 className="text-bold">BOOKING ID :</h5>
                                <p>06c1774-7f3d-46ad...90a8</p>
                            </div>
                            <div>
                                <h5 className="text-bold">TYPE :</h5>
                                <p>Free</p>
                            </div>
                            <div>
                                <h5 className="text-bold">total Ticket :</h5>
                                <p>10</p>
                            </div>
                            <div>
                                <button className="btn btn-success list-Ticket-mng-1" type="button">View All Scanners</button>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="tickets-data-text-last">
                                <h4 style={{fontWeight: '700'}}>Tickect Scan Status</h4>
                                <span class="badge-theme-warning badge-theme"><FaClock /> Pending</span>
                            </div>
                        </Col>
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
                                                                        <td>{item.date} {item.time} <span onClick={() => setModal(!modal)} className="order-view-btn"><FaChevronDown /></span></td>
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