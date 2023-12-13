import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import QrcodeLotte from '../../lotte/qr-code-scaner-gif.json'
import NocameraLotte from '../../lotte/nocamera.json'
import Lottie from "lottie-react";
import Whitebtn from '../../component/Whitestarbtn';
import { admin_url, app_url, apiurl, customer_url, organizer_url } from '../../common/Helpers';
import { Link, useNavigate } from 'react-router-dom';
const Dashboard = ({ title }) => {
    const [openQrcode, setopenQrcode] = useState(true);
    const [scanLocation, setScanLocation] = useState('');
    const intervalRef = useRef(null); // Ref to hold the interval
    const navigate = useNavigate();
    useEffect(() => {
        reloadOneTime();
        intervalRef.current = setInterval(checkForResult, 1000); // Run checkForResult every second

        return () => clearInterval(intervalRef.current); // Clean up interval on component unmount
    }, []);
    const openscanner = () => {
        setopenQrcode(true)
    }
    const reloadOneTime = () => {
        if (!window.location.hash) {
            window.location = window.location + '##';
            window.location.reload();
        }
    };
    const Goback = () => {
        window.location.href = organizer_url + 'tixme-scanner';
    };

    const checkForResult = () => {
        const resultElement = document.getElementById('camera-result');
        if (resultElement && resultElement.textContent.trim() !== '') {
            let maintext = JSON.parse(resultElement.textContent.trim());
            localStorage.setItem('scandata', maintext.id)
            window.location.href = organizer_url + 'tixme-validate';
            clearInterval(intervalRef.current); // Stop the interval
        }
    };
    const lottewidth = {
        width: 'auto',
        height: '200px'
    }
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <div className="page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">{title}</li>
                        </ol>
                    </div>

                    {openQrcode ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <div>{scanLocation}</div>
                                <Card>
                                    <Card.Body className="text-center">
                                        <section>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-12 col-md-10 offset-md-1">
                                                        <h3 className="text-start text-md-center"></h3>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="camera-off">
                                                            <div id="message-denied">
                                                                <Lottie className="" animationData={NocameraLotte} style={lottewidth} />

                                                                <div class="alert alert-primary alert-dismissible fade show">
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                                                    <strong>Welcome!</strong> Please allow camera access to scan QR codes.
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div id="message-off" style={{ display: 'none' }}>
                                                                <Lottie className="" animationData={NocameraLotte} style={lottewidth} />
                                                                <div class="alert alert-warning alert-dismissible fade show">
                                                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                                                    <strong>No!</strong> camera found !
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="camera-on" style={{ display: 'none' }}>
                                                            <div id="camera-preview"></div>
                                                        </div>
                                                        <div className="camera-result">
                                                            
                                                        </div>
                                                    </div>
                                                    <div className='col-12 mt-5'>
                                                        <span   className='' onClick={() => Goback()}>
                                                            <Whitebtn title={'Back'} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card>

                                    <Card.Body className="text-center">
                                        <div>
                                            <h2 className="">{title}</h2>
                                            <Lottie className="py-2" animationData={QrcodeLotte} style={lottewidth} />
                                            <span className="ml-5" onClick={() => openscanner()}>
                                                <Whitebtn title={'Scan Item'} />
                                            </span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>

        </>
    )
}
export default Dashboard;