import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url } from '../../../common/Helpers';
import WhiteButton from '../../../component/Whitestarbtn';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal)
    const [modal, setModal] = useState(false);
    const [Btnloader, setBtnloader] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [apiLoader, setapiLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);

    const [Email, setEmail] = useState();
    const [Updatid, setUpdatid] = useState();
    const [Title, setTitle] = useState();
    const [Message, setMessage] = useState();
    const [Isopen, setIsopen] = useState();
    const [Messagelog, setMessagelog] = useState([]);

    const [ReplyMessage, setReplyMessage] = useState();
    const [Isclosestatus, setIsclosestatus] = useState();
    const fetchList = async () => {
        try {
            // const requestData = {
            //     isclose: 0
            // };
            fetch(apiurl + 'admin/support/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                // body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setLoader(false)
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
    const HandelReplyapi = async () => {
        if (!ReplyMessage && Isclosestatus === 0) {
            return toast.error('Reply message is required');
        }
        try {
            const requestData = {
                replymessage: ReplyMessage,
                id: Updatid,
                closestatus: Isclosestatus
            };
            fetch(apiurl + 'admin/support/store-replay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        toast.success(data.data);
                        console.log("hii", Isclosestatus);
                        if (Isclosestatus == 1) {
                            setModal(!modal);
                            fetchList();
                        } else {
                            Handelviewmodal(Updatid)
                        }
                        setReplyMessage('');
                        // setapiLoader(false)
                    } else {
                        // setModal(false)
                        // setapiLoader(false)
                    }
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    // setModal(false)
                    // setapiLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setModal(false)
        }
    }
    const Handelviewmodal = async (id) => {
        try {
            const requestData = {
                id: id,
            };
            setModal(true)
            setapiLoader(true)
            fetch(apiurl + 'admin/support/view', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setUpdatid(data.data._id);
                        setEmail(data.data.email);
                        setTitle(data.data.title);
                        setIsopen(data.data.isclose);
                        setIsclosestatus(data.data.isclose);
                        setMessage(data.data.message);
                        setMessagelog(data.data.messagelog);
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
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={!modal}>Support</ModalHeader>
                <ModalBody>
                    {apiLoader ? (
                        <div className="linear-background w-100"> </div>
                    ) : (
                        <>
                            <Row>
                                <Col md={12}>
                                    <h5 className="text-black">Email</h5>
                                    <p class="mb-0">{Email}</p>
                                </Col>
                                <Col md={12}>
                                    <h5 className="text-black">Title</h5>
                                    <p class="mb-0 text-info">{Title}</p>
                                </Col>
                                <Col md={12}>
                                    <h5 className="text-black">Message</h5>
                                    <p class="mb-0 text-danger">{Message}</p>
                                </Col>
                                <Col md={12} className='border-bottom py-2 mb-4'></Col>
                                <Col md={12}>
                                    {Messagelog ? (
                                        <div id="DZ_W_TimeLine" className="widget-timeline dz-scroll px-4 height300 overflow-y-scroll">
                                            <ul className="timeline">
                                                {[...Messagelog].reverse().map((item, index) => (
                                                    <li key={index}>
                                                        <div className={item.usertype === 'Admin' ? 'timeline-badge primary' : 'timeline-badge warning'}></div>
                                                        <a className="timeline-panel text-muted" href="javascript:void(0);">
                                                            <span>{item.date} | {item.usertype === 'Admin' ? 'ADMIN' : 'USER'}</span>
                                                            <h6 className="mb-0">{item.replymessage}</h6>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="alert alert-primary alert-dismissible fade show">
                                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                                <strong>No Reply Found!</strong>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Col>
                                <Col md={12} className='border-bottom py-2'></Col>
                                {Isopen === 1 ? (
                                    <div className="alert alert-danger alert-dismissible fade show">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                        <strong>Support ticket closed</strong>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <Col md={12} className="mt-3">
                                            <div className="form-group">
                                                <p>Message <span className="text-danger">*</span></p>
                                                <textarea placeholder="Type your message" class="form-control" rows="3" value={ReplyMessage} onChange={(e) => setReplyMessage(e.target.value)}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <p>Support status</p>
                                                <select className="form-control" onChange={(e) => setIsclosestatus(e.target.value)}>
                                                    <option selected={Isopen === '0' ? true : false} value="0">Open</option>
                                                    <option selected={Isopen === '1' ? true : false} value="1">Close</option>
                                                </select>
                                            </div>
                                        </Col>
                                        <Col md={12}>
                                            <div className="form-group">
                                                {Btnloader ? (
                                                    <Button className='signup-page-btn'>Please wait...</Button>
                                                ) : (
                                                    <span onClick={HandelReplyapi}><WhiteButton title={'Send'} /></span>
                                                )}
                                            </div>
                                        </Col>
                                    </>
                                )}
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
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <Link className="page-theme-btn position-right" to={admin_url + 'active-organizers'}>View organizer</Link>
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
                                            <div class="table-responsive">
                                                {Loader ? (
                                                    <div className="linear-background w-100"> </div>
                                                ) : (
                                                    <table class="table table-responsive-md">
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: '80px' }}><strong>#</strong></th>
                                                                <th><strong>User type</strong></th>
                                                                <th><strong>User email</strong></th>
                                                                <th><strong>Date</strong></th>
                                                                <th><strong>Title</strong></th>
                                                                <th><strong>Message</strong></th>
                                                                <th><strong>Status</strong></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Listitems.map((item, index) => (
                                                                <tr>
                                                                    <td><strong>{index + 1}</strong></td>
                                                                    <td>
                                                                        {item.usertype == "customer" ? (
                                                                            <span class="badge badge-xs light badge-success">{item.usertype}</span>
                                                                        ) : (
                                                                            <span class="badge badge-xs light badge-primary">{item.usertype}</span>
                                                                        )}
                                                                    </td>
                                                                    <td>{item.email}</td>
                                                                    <td>{item.date}</td>
                                                                    <td>{item.title}</td>
                                                                    <td>{item.message}</td>
                                                                    <td>{item.isclose === 0 ? (<span class="badge badge-rounded badge-success">Open</span>) : (<span class="badge badge-rounded badge-danger">Closed</span>)}</td>
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                                <Button variant="link" onClick={() => Handelviewmodal(item._id)} class="dropdown-item">View</Button>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
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