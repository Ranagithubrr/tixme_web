import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import UserImg from '../../common/image/Ellipse 73.png';
const Dashboard = ({ title }) => {
    useEffect(() => {

    }, []);
    return (
        <>
            <div className="content-body" style={{ background: '#F1F1F1' }}>
                <div className="container-fluid">
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="py-4 grey-bg">
                                <Card.Body>
                                    <Row>
                                        <Col md={10}>
                                            <div className="reward-ui-box p-4">
                                                <Row>
                                                    <Col md={6}>
                                                        <img src={UserImg} height={50} width={50} alt="" /> <span className="rewrd-user-name1">Hi Alex</span>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="text-end">
                                                            <p className="reward-point-text">Rewards Points</p>
                                                            <p className="reward-point-count">900</p>
                                                        </div>
                                                    </Col>
                                                    <Col md={12} className="pb-3">
                                                        <Row style={{borderBottom: '1px solid #000'}}>
                                                            <Col md={4} className="text-center">
                                                                <div className="border-right" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                                    <p className="rewarx-box-c-title">Your status</p>
                                                                    <p className="rewarx-box-c-sts">Silver TIER</p>
                                                                </div>
                                                            </Col>
                                                            <Col md={4} className="text-center">
                                                                <div className="border-right" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                                    <p className="rewarx-box-c-title">Status expires on</p>
                                                                    <p className="rewarx-box-c-sts">Aug 27, 2024</p>
                                                                </div>
                                                            </Col>
                                                            <Col md={4} className="text-center">
                                                                <div>
                                                                    <p className="rewarx-box-c-title">Bookings in last 2 years</p>
                                                                    <p className="rewarx-box-c-sts">2 <span className="colplete-yext-1">completed</span></p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col md={6}>
                                                        <p className="Booking-progress-towards">Booking progress towards  <span>GOLD TIER</span></p>
                                                    </Col>
                                                    <Col md={6} className="text-end">
                                                        <p className="Booking-progress-towards"><span>2/10</span> Bookings Completed</p>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
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