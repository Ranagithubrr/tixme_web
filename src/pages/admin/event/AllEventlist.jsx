import React, { useEffect, useState } from "react";
import JoinStartButton from "../../../common/elements/JoinStartButton";
import whitestar from '../../../common/icon/whitestar.svg';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { apiurl,admin_url, organizer_url } from '../../../common/Helpers';
import { Link } from "react-router-dom";
const Dashboard = ({ title }) => {
    const [Loader, setLoader] = useState(false);
    const [Listitems, setListitems] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const MySwal = withReactContent(Swal);
    function CheckDelete(id){
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
    const fetchmyEvent = async () => {
        try {
            fetch(apiurl + 'admin/event-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setListitems(data.data);
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
    useEffect(() => {
        fetchmyEvent();
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
                                            <div class="table-responsive">
                                                <table class="table table-responsive-md">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '80px' }}><strong>#</strong></th>
                                                            <th><strong>Organizer</strong></th>
                                                            <th><strong>Event name</strong></th>
                                                            <th><strong>Location</strong></th>
                                                            <th><strong>Revenue</strong></th>
                                                            <th><strong>Tickets sold</strong></th>
                                                            <th><strong>Date</strong></th>
                                                            <th><strong>Status</strong></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Listitems.map((item, index) => (
                                                            <tr>
                                                                <td><strong>{index + 1}</strong></td>
                                                                <td>{item.organizer_name}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.location}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.orderCount}</td>
                                                                <td>{item.date}</td>
                                                                <td><span class="badge light badge-success">Active</span></td>
                                                                <td>
                                                                    <div class="dropdown">
                                                                        <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                            <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" /></g></svg>
                                                                        </button>
                                                                        <div class="dropdown-menu">
                                                                        
                                                                            <Link to={`${admin_url}event/edit-event/${item._id}/${item.name}`} class="dropdown-item">Edit</Link>
                                                                            {/* <Button variant="link" class="dropdown-item">Delete</Button> */}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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