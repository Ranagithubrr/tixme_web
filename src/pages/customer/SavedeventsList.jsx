import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, isEmail, app_url } from '../../common/Helpers';
import Swal from 'sweetalert2'
import toast from "react-hot-toast";
import withReactContent from 'sweetalert2-react-content'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import QRCode from 'react-qr-code';
import { Link, useNavigate } from "react-router-dom";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const MySwal = withReactContent(Swal);
    function CheckDelete(id) {
        MySwal.fire({
            title: 'Are you sure you want to remove?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteData(id)
            } else if (result.isDenied) {

            }
        })
    }
    const deleteData = async (id) => {
        try {
            setLoader(true)
            const requestData = {
                id: id
            }
            fetch(apiurl + "website/delete-saved-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success == true) {
                        fetchList()
                        toast.error("Removed");
                    } else {

                    }
                })
                .catch((error) => {
                    console.error("Insert error:", error);
                });
        } catch (error) {
            console.error('Login api error:', error);
            setLoader(false)
        }
    }
    const fetchList = async () => {
        try {
            setLoader(true)
            fetch(apiurl + 'website/savedevents-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Beartoken}`,
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data)
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

    const viewEvent = async (id, name) => {
        navigate(`${app_url}event/${id}/${name}`);
    }
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
                                                                                <th><strong>Name</strong></th>
                                                                                <th><strong>Start Date / Time</strong></th>
                                                                                <th><strong>End Date / Time</strong></th>
                                                                                <th><strong>View</strong></th>
                                                                                <th><strong>Action</strong></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Listitems.map((item, index) => (
                                                                                <tr>
                                                                                    <td>
                                                                                        <strong>{index + 1}</strong>
                                                                                    </td>
                                                                                    <td>{item.eventname}</td>
                                                                                    <td>{item.start_date} {item.start_time}</td>
                                                                                    <td>{item.end_date} {item.end_time}</td>
                                                                                    <td>
                                                                                        <button onClick={() => viewEvent(item.eventid, item.eventname)} type="button" class="btn btn-success">View</button>
                                                                                    </td>
                                                                                    <td>
                                                                                        <button onClick={() => CheckDelete(item._id)} type="button" class="btn btn-danger">Remove</button>
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