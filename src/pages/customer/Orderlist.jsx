import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, isEmail, app_url } from '../../common/Helpers';
import QRsuccess from '../../common/icon/qr-code-pay.png';
import QR from '../../common/image/qr.png'
import WhiteButton from '../../component/Whitestarbtn';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QRCode from 'react-qr-code';
import { useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const [Ticketlist, setTicketlist] = useState([]);
    const [apiLoader, setapiLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [TransferModal, setTransferModal] = useState(false);

    const [TransferName, setTransferName] = useState();
    const [TransferEmail, setTransferEmail] = useState();
    const [TransferId, setTransferId] = useState();
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'order/customer/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                    } else {
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
    const handelTransferModal = async (id) => {
        try {
            setModal(false)
            setTransferModal(true)
            setTransferId(id)
        } catch (error) {
            console.error('Login api error:', error);
            setModal(false)
        }
    }
    const handelTransferTickets = async () => {
        try {
            if (!TransferName) {
                return toast.error("Name is require");
            }
            if (!TransferEmail) {
                return toast.error("Email is require");
            }
            const requestData = {
                id: TransferId,
                email: TransferEmail,
                name: TransferName,
            };
            fetch(apiurl + 'order/tickets-transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.message);
                        setTransferName('');
                        setTransferEmail('');
                        setTransferId('');
                        setTransferModal(false)
                    } else {
                        toast.error(data.message);
                    }
                })
                .catch(error => {
                    toast.error(error.message);
                    console.error('Insert error:', error);
                    setTransferModal(false)
                });
        } catch (error) {
            toast.error(error.message);
            console.error('Login api error:', error);
            setTransferModal(false)
        }
    }
    const Handelviewmodal = async (id) => {
        try {
            const requestData = {
                id: id,
            };
            setModal(true)
            setapiLoader(true)
            fetch(apiurl + 'order/ticket-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setTicketlist(data.data);
                        setapiLoader(false)
                    } else {
                        setModal(false)
                        setapiLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setModal(false)
                    setapiLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setModal(false)
        }
    }
    const generateRandomNumber = () => {
        return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
    };
    useEffect(() => {
        if (!Beartoken) {
            toast.error("Login to your account");
            navigate(app_url + 'auth/customer/signup');
            return;
        }
        fetchList();
    }, []);
    return (
        <>
            <Modal className="ticket-view-page" isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={!modal}>View tickets</ModalHeader>
                <ModalBody>
                    {Loader ? (
                        <div className="linear-background w-100"> </div>
                    ) : (
                        <>
                            <Row className="ticket-list-row">
                                {Ticketlist.map((item, index) => (
                                    <Col md={12} className="mb-4">
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
                                                    <>
                                                        {item.scan_status == 0 ? (
                                                            <QRCode style={{ height: "auto", width: "150px" }} value={JSON.stringify({ id: item._id, time: generateRandomNumber(), index: index })} />
                                                        ) : (
                                                            <img style={{ height: "auto", width: "150px" }} src={QRsuccess} className="qr-scanner-success" alt="" />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className="ticket-data">
                                                <p className="ticket-view-title">Event Name</p>
                                                <p className="ticket-view-data">{item.eventdata.display_name}</p>
                                                <p className="ticket-view-title">Place</p>
                                                <p className="ticket-view-data">{item.eventdata.location}</p>
                                                <p className="ticket-view-title">event data</p>
                                                <p className="ticket-view-data">{item.eventdata.start_date} {item.eventdata.start_time}</p>
                                                <p className="ticket-view-title">Created by</p>
                                                <p className="ticket-view-data">{item.user_email}</p>
                                                {item.is_transfer ? '' : (
                                                    <>
                                                        {item.scan_status == 0 && item.isvalid == 0 ? (
                                                            <div>
                                                                <button onClick={() => handelTransferModal(item._id)} className="btn btn-success w-100">Transfer</button>
                                                            </div>
                                                        ) : ''}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                ))}

                            </Row>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setModal(!modal)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal className="" isOpen={TransferModal} toggle={() => setTransferModal(!TransferModal)}>
                <ModalHeader toggle={!TransferModal}>Transfer tickets</ModalHeader>
                <ModalBody>
                    {apiLoader ? (
                        <div className="linear-background w-100"> </div>
                    ) : (
                        <>
                            <div className="form-group">
                                <p>Name <span className="text-danger">*</span></p>
                                <input placeholder="Enter name" class="form-control" value={TransferName} onChange={(e) => setTransferName(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <p>Email <span className="text-danger">*</span></p>
                                <input placeholder="Enter email" class="form-control" value={TransferEmail} onChange={(e) => setTransferEmail(e.target.value)}></input>
                            </div>
                            <div>
                                <button onClick={() => handelTransferTickets()} className="btn btn-success w-100">Transfer</button>
                            </div>
                        </>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setTransferModal(!TransferModal)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                            {Loader ? (
                                                <div className="linear-background w-100"> </div>
                                            ) : (
                                                <>
                                                    {Listitems.length > 0 ? (
                                                        <>
                                                            <div class="table-responsive">
                                                                {Loader ? (
                                                                    <div className="linear-background w-100"> </div>
                                                                ) : (
                                                                    <table class="table table-responsive-md">
                                                                        <thead>
                                                                            <tr>
                                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                                <th><strong>Date</strong></th>
                                                                                <th><strong>Amount</strong></th>
                                                                                <th><strong>Transaction Id</strong></th>
                                                                                <th><strong>Payment Status</strong></th>
                                                                                <th><strong>View Tickets</strong></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Listitems.map((item, index) => (
                                                                                <tr>
                                                                                    <td>
                                                                                        <strong>{index + 1}</strong>
                                                                                    </td>
                                                                                    <td>{item.date} {item.time}</td>
                                                                                    <td>{item.amount}</td>
                                                                                    <td>{item.tnsid}</td>
                                                                                    <td><span class="badge light badge-success">Success</span></td>
                                                                                    <td>
                                                                                        <button type="button" onClick={() => Handelviewmodal(item._id)} class="btn btn-rounded btn-success">View Tickets</button>
                                                                                    </td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div class="no-data-box">
                                                            <p>No Data Found !</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                        </Col>
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