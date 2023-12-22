import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

import { apiurl, admin_url, isEmail } from '../../../common/Helpers';
import Searchicon from '../../../common/icon/searchicon.png';

import WhiteButton from '../../../component/Whitestarbtn';
import Norecord from '../../../component/Norecordui';
import { Link } from "react-router-dom";
import Select from 'react-select'
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaCircle } from "react-icons/fa6";
const Dashboard = ({ title }) => {
    const MySwal = withReactContent(Swal)
    const OrganizerId = localStorage.getItem('organizerid');
    const Beartoken = localStorage.getItem('userauth');
    const [newTitle, setnewTitle] = useState();
    const [newMessage, setnewMessage] = useState();

    const [modal, setModal] = useState(false);
    const [newmodal, setNewModal] = useState(false);
    const [Btnloader, setBtnloader] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [ListLoader, setListLoader] = useState(false);
    const [apiLoader, setapiLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);

    const [Email, setEmail] = useState();
    const [Updatid, setUpdatid] = useState();
    const [Title, setTitle] = useState();
    const [Message, setMessage] = useState();
    const [Isopen, setIsopen] = useState();
    const [Messagelog, setMessagelog] = useState([]);

    const [ReplyMessage, setReplyMessage] = useState();
    const fetchList = async () => {
        setListLoader(true)
        try {
            const requestData = {
                id: OrganizerId
            };
            fetch(apiurl + 'website/organizer/support/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
                        setListLoader(false)
                    } else {

                    }
                    setListLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setListLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setListLoader(false)
        }

    }
    const HandelOrganizerform = async () => {
        try {
            if (!newTitle) {
                return toast.error('Title is required');
            }
            if (!newMessage) {
                return toast.error('Message is required');
            }
            const id = OrganizerId;
            const requestData = {
                id: id,
                title: newTitle,
                message: newMessage
            };
            setLoader(true);
            fetch(apiurl + 'website/organizer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    MySwal.fire({
                        text: "Support ticket submitted successfully!",
                        icon: "success"
                    });
                    setNewModal(!newmodal)
                    setnewTitle('');
                    setnewMessage('');
                    fetchList();
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Insert error: ' + error.message);
                console.error('Insert error:', error);
            });

        } catch (error) {

        }
    };
    const Handelform = async () => {
        try {
            if (!newTitle) {
                return toast.error('Title is required');
            }
            if (!newMessage) {
                return toast.error('Message is required');
            }
            const id = OrganizerId;
            const requestData = {
                id: id,
                title: newTitle,
                message: newMessage
            };
            setLoader(true);
            fetch(apiurl + 'website/customer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    MySwal.fire({
                        text: "Support ticket submitted successfully!",
                        icon: "success"
                    });
                    setNewModal(!newmodal)
                    setnewTitle('');
                    setnewMessage('');
                    fetchList();
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Insert error: ' + error.message);
                console.error('Insert error:', error);
            });

        } catch (error) {

        }
    };
    const HandelReplyapi = async () => {
        if (!ReplyMessage) {
            return toast.error('Reply message is required');
        }
        try {
            setBtnloader(true)
            const requestData = {
                replymessage: ReplyMessage,
                id: Updatid
            };
            fetch(apiurl + 'website/support/store-replay', {
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
                        Handelviewmodal(Updatid)
                        setReplyMessage('');
                    } else {

                    }
                    setBtnloader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setBtnloader(false)

                });
        } catch (error) {
            console.error('Login api error:', error);
            setModal(false)
            setBtnloader(false)
        }
    }
    const Handelnewmodal = async () => {
        setNewModal(true)
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


    // select code
    const [TicketTypelist, setTicketTypelist] = useState([{ value: "Ticket Type test", label: "Ticket Type test" }]);
    const [TicketTypevalue, setTicketTypevalue] = useState();
    const [TicketType, setTicketType] = useState();
    const TicketTypeOption = [
        {
            options: TicketTypelist
        }
    ]
    const selectTicketType = (SelectValue) => {
        setTicketType(SelectValue);
        setTicketTypevalue(SelectValue.value);
    };
    // select code
    const [TicketPrioritylist, setTicketPrioritylist] = useState([{ value: "High Priority", label: "High Priority" }]);
    const [TicketPriorityvalue, setTicketPriorityvalue] = useState();
    const [TicketPriority, setTicketPriority] = useState();
    const TicketPriorityOption = [
        {
            options: TicketPrioritylist
        }
    ]
    const selectTicketPriority = (SelectValue) => {
        setTicketPriority(SelectValue);
        setTicketPriorityvalue(SelectValue.value);
    };

    const StoreNewTicket = async () => {
        try {
            if (!Email) {
                return toast.error('Type your email');
            }
            if (!isEmail(Email)) {
                return toast.error('Enter valid email');
            }
            if (!Message) {
                return toast.error('Type your Message');
            }
            const requestData = {
                id: OrganizerId,
                email: Email,
                message: Message,
                tickettype: TicketTypevalue,
                priority: TicketPriorityvalue,
            };
            setLoader(true);
            fetch(apiurl + 'website/organizer/support/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            }).then(response => response.json()).then(data => {
                setLoader(false);
                if (data.success == true) {
                    toast.success('Submitted successfully');
                    setEmail('');
                    setMessage('');
                    setTicketType('');
                    setTicketTypevalue('');
                    setTicketPriority('');
                    setTicketPriorityvalue('');
                } else {
                    toast.error(data.message);
                }
                setLoader(false);
            }).catch(error => {
                setLoader(false);
                toast.error('Error: ' + error.message);
            });
        } catch (error) {
            toast.error(error);
        }
    }

    const [Datetype, setDatetype] = useState();
    const [Datevalue, setDatevalue] = useState();
    const selectDatefiltertype = (selectedValue) => {
        setDatevalue(selectedValue);
        setDatetype(selectedValue.value);
    };
    const DatefilterOption = [
        {
            options: [
                { value: "Today", label: "Today" },
                { value: "Tomorrow", label: "Tomorrow" },
                { value: "Next 7 days", label: "Next 7 days" },
                { value: "This month", label: "This month" },
                { value: "Next month", label: "Next month" },
                { value: "Pick a date", label: "Pick a date" },
                { value: "Pick between two dates", label: "Pick between two dates" },
            ]
        }
    ]

    const [Priorityfiltertype, setPriorityfiltertype] = useState();
    const [Priorityfiltervalue, setPriorityfiltervalue] = useState();
    const selectPriorityfilter = (selectedValue) => {
        setPriorityfiltervalue(selectedValue);
        setPriorityfiltertype(selectedValue.value);
    };

    const CustomOption = ({ innerProps, label, value }) => {
        let iconColor = '';

        // Apply different icon colors based on the value
        switch (value) {
            case 'New Tickets':
                iconColor = 'text-warning';
                break;
            case 'On-Going Tickets':
                iconColor = 'text-success';
                break;
            case 'Resolved Tickets':
                iconColor = 'text-primary';
                break;
            default:
                iconColor = '';
        }

        return (
            <div {...innerProps}>
                <span><span style={{ paddingLeft: '5px' }} className={`ticket-sts-icon ${iconColor}`}><FaCircle /></span> <span className="cpointer">{label}</span></span>
            </div>
        );
    };
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            padding: 10,
        }),
    };
    const PriorityfilterOption = [
        {
            options: [
                { value: "New Tickets", label: "New Tickets" },
                { value: "On-Going Tickets", label: "On-Going Tickets" },
                { value: "Resolved Tickets", label: "Resolved Tickets" },
            ]
        }
    ]

    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">

                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4">
                                <Card.Body>
                                    <Row>
                                        <Col md={8}>
                                            <div className="ticket-list">
                                                <Row className="react-select-h">
                                                    <Col md={3}>
                                                        <Select
                                                            isClearable={false}
                                                            options={DatefilterOption}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            placeholder='Select Filter'
                                                            onChange={selectDatefiltertype}
                                                            value={Datevalue}
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Select
                                                            isClearable={false}
                                                            options={PriorityfilterOption[0].options}
                                                            components={{ Option: CustomOption }}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            placeholder='Select Status'
                                                            onChange={selectPriorityfilter}
                                                            value={Priorityfiltervalue}
                                                        />
                                                    </Col>
                                                    <Col md={3}></Col>
                                                    <Col md={3}>
                                                        <div class="input-group mb-3 input-warning-o grey-border">
                                                            <span class="input-group-text"><img src={Searchicon} alt="" /></span>
                                                            <input type="text" class="form-control" placeholder="Search for ticket" />
                                                        </div>
                                                    </Col>
                                                    {ListLoader ? (
                                                        <>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                            <div className="mb-5 linear-background w-100" style={{ height: '150px' }}> </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {Listitems.length > 0 ? (
                                                                <>
                                                                    {Listitems.map((item, index) => (
                                                                        <Col md={12} className="mb-5">
                                                                            <div className="support-tickets-list-1">
                                                                                <div className="xyz-ticket-desc-box">
                                                                                    <p><span className="ticket-sts-icon text-success"><FaCircle /></span><span className="ticket-head-tt1">Ticket# {item.uniqueid}</span></p>
                                                                                    <p className="ticket-type-12">{item.tickettype}</p>
                                                                                    <p className="ticket-message7">{item.message}</p>
                                                                                </div>
                                                                                <Row className="ticket-box-time1">
                                                                                    <Col md={6}>
                                                                                        <p className="date-and-time-ticket">Posted at {item.time}</p>
                                                                                    </Col>
                                                                                    <Col md={6} className="text-end">
                                                                                        <a className="Open-Ticket-link">Open Ticket</a>
                                                                                    </Col>
                                                                                </Row>
                                                                            </div>
                                                                        </Col>
                                                                    ))}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Norecord />
                                                                </>
                                                            )}

                                                        </>
                                                    )}
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="ticket-form">
                                                <div className="pb-3 border-bottom" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                    <h3 className="mb-1" style={{ fontWeight: '600' }}>Create Quick Ticket</h3>
                                                    <p className="mb-1" style={{ fontWeight: '500', fontSize: '14px' }}>Write and address new queries and issues</p>
                                                </div>
                                                <div className="form-area-1 py-4">
                                                    <div className="form-group">
                                                        <p className="mb-2">Customer Email</p>
                                                        <input className="form-control" type="text" placeholder="Type Email" value={Email} onChange={(e) => setEmail(e.target.value)}></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <p className="mb-2">Request Ticket Type</p>
                                                        <Select
                                                            isClearable={false}
                                                            options={TicketTypeOption}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            placeholder='Choose Type'
                                                            onChange={selectTicketType}
                                                            value={TicketType}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <p className="mb-2">Priority Status</p>
                                                        <Select
                                                            isClearable={false}
                                                            options={TicketPriorityOption}
                                                            className='react-select'
                                                            classNamePrefix='select'
                                                            placeholder='Select Status'
                                                            onChange={selectTicketPriority}
                                                            value={TicketPriority}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <p className="mb-2">Ticket Body</p>
                                                        <textarea class="form-control" rows="5" placeholder="Type ticket issue here.." value={Message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        {Loader ? (
                                                            <button className="btn btn-primary w-100" type="button">Please wait...</button>
                                                        ) : (
                                                            <button className="btn btn-primary w-100" onClick={StoreNewTicket} type="button">Submit</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
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