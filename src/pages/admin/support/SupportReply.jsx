import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, getSupportbagecolor } from '../../../common/Helpers';
import Alert from 'react-bootstrap/Alert';
import { Link, useParams } from "react-router-dom";
import Select from 'react-select'
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import { FaCircle } from "react-icons/fa6";
const Dashboard = ({ title }) => {
    const OrganizerId = localStorage.getItem('organizerid');
    const [Loader, setLoader] = useState(true);
    const [BtnLoader, setBtnLoader] = useState(false);
    const [SupportData, setSupportData] = useState();
    const [Message, setMessage] = useState();

    const [Isclosetype, setIsclosetype] = useState();
    const [Isclosetypevalue, setIsclosetypevalue] = useState();
    const selectIsclosetype = (selectedValue) => {
        setIsclosetype(selectedValue);
        setIsclosetypevalue(selectedValue.value);
    };
    const IscloseOption = [
        {
            options: [
                { value: "1", label: "Pending" },
                { value: "2", label: "Resolved" }
            ]
        }
    ]

    const { id } = useParams();
    const GetSupportDetails = async () => {
        try {
            const requestData = {
                id: id,
                organizerid: OrganizerId
            };
            setLoader(true)
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
                        setSupportData(data.data)
                        if (data.data.isclose && data.data.isclose == 0 || data.data.isclose == 1) {
                            setIsclosetype([{ value: "1", label: "Pending" }])
                        }
                        if (data.data.isclose && data.data.isclose == 2) {
                            setIsclosetype([{ value: "2", label: "Resolved" }])
                        }
                    } else {

                    }
                    setLoader(false);
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setLoader(false);
                });
        } catch (error) {
            console.error('Api error:', error);
            setLoader(false);
        }
    }
    const StoreTicketreply = async () => {
        try {
            if (!Message) {
                return toast.error('Type your Message');
            }
            if (!Isclosetypevalue) {
                return toast.error('Select status');
            }
            setBtnLoader(true)
            const requestData = {
                replymessage: Message,
                id: id,
                closestatus: Isclosetypevalue
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
                        toast.success('Successful')
                        setMessage('');
                        GetSupportDetails();
                    }
                    setBtnLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setBtnLoader(false)
        }

    }
    useEffect(() => {
        GetSupportDetails();
    }, []);

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">

                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row>
                                        {Loader ? (
                                            <div className="linear-background w-100"> </div>
                                        ) : (
                                            <Col md={12}>
                                                <div className="reply-box-1">
                                                    <Row>
                                                        <Col md={6}>
                                                            <p><span className={`ticket-sts-icon ${getSupportbagecolor(SupportData.isclose)}`}><FaCircle /></span><span className="ticket-head-tt1">Ticket# {SupportData.uniqueid}</span></p>
                                                        </Col>
                                                        <Col md={6} className='text-end'>
                                                            <p>Posted at {SupportData.time}</p>
                                                        </Col>
                                                        <Col md={12}>
                                                            <div className="py-4">
                                                                <p className="ticket-type-12">{SupportData.tickettype}</p>
                                                                <p className="ticket-message7">{SupportData.message}</p>
                                                            </div>
                                                        </Col>
                                                        {SupportData.messagelog && SupportData.messagelog.map((item, index) => (
                                                            <Col md={12}>
                                                                <div className="reply-message-cs">
                                                                    <Row>
                                                                        <Col md={6}>
                                                                            {item.usertype == 'User' ? (
                                                                                <p><span className="bage-light-css">Organizer</span></p>
                                                                            ) : (
                                                                                <p><span className="bage-danger-css">{item.usertype}</span></p>
                                                                            )}
                                                                        </Col>
                                                                        <Col md={6} className='text-end'>
                                                                            <p>Posted at {item.date} {item.time}</p>
                                                                        </Col>
                                                                        <Col md={12}>
                                                                            <p className="ticket-message7">{item.replymessage}</p>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                        {SupportData.isclose != 2 ? (
                                                            <Col md={12}>
                                                                <div className="reply-area-1 border-light p-3" style={{ background: '#FCFCFC', border: '1px solid #FCFCFC', borderRadius: '10px' }}>
                                                                    <p className="mb-3" style={{ fontWeight: '600' }}>Reply to Ticket</p>
                                                                    <Row>
                                                                        <Col md={4} className="react-select-h mb-3">
                                                                            <p className="mb-2">Ticket status</p>
                                                                            <Select
                                                                                isClearable={false}
                                                                                options={IscloseOption}
                                                                                className='react-select'
                                                                                classNamePrefix='select'
                                                                                placeholder='Select Filter'
                                                                                onChange={selectIsclosetype}
                                                                                value={Isclosetype}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <div className="form-group">
                                                                        <p className="mb-2">Ticket Body</p>
                                                                        <textarea class="form-control" rows="5" placeholder="Type ticket issue here.." value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                                                    </div>
                                                                    <div className="form-group text-end">
                                                                        {BtnLoader ? (
                                                                            <button className="btn btn-primary" type="button">Please wait...</button>
                                                                        ) : (
                                                                            <button className="btn btn-primary" onClick={StoreTicketreply} type="button">Submit Reply</button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        ) : (
                                                            <Alert variant={'success'}>
                                                                This ticket has been successfully resolved.
                                                            </Alert>
                                                        )}
                                                    </Row>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                </Card.Body>
                            </Card >
                        </Col >
                    </Row >
                </div >
            </div >

        </>
    )
}
export default Dashboard;