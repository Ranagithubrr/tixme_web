import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import UserImg from '../../common/image/Ellipse 73.png';
import { apiurl } from '../../common/Helpers';
import Nouserphoto from '../../common/image/nouser.png';
import RewardBg from '../../common/image/reqard.svg';
import Silver from '../../common/image/star/Group 1171274979.svg';
import Gold from '../../common/image/star/Group 1171274980.svg';
import Prem from '../../common/image/star/Group 1171274981.svg';
import { FaStar } from "react-icons/fa6";
const Dashboard = ({ title }) => {
    const Beartoken = localStorage.getItem('userauth');
    const [name, setName] = useState();
    const [picture, setpicture] = useState();
    const [userdata, setuserdata] = useState();
    const [loader, setLoader] = useState(true);
    const fetchData = async () => {
        try {
            setLoader(true);
            fetch(apiurl + 'website/get-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setpicture(data.data.picture);
                        setName(data.data.first_name);
                        setuserdata(data.data);
                        setLoader(false);
                    }
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
    useEffect(() => {
        fetchData();
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
                                                    {loader ? (
                                                        <div className="linear-background w-100"> </div>
                                                    ) : (
                                                        <>
                                                            <Col md={6}>
                                                                <img src={picture ? picture : Nouserphoto} height={50} width={50} alt="" /> <span className="rewrd-user-name1">Hi <span style={{ textTransform: 'capitalize' }}>{name}</span></span>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className="text-end">
                                                                    <p className="reward-point-text">Rewards Points</p>
                                                                    <p className="reward-point-count">{userdata.wallet ? userdata.wallet : 0}</p>
                                                                </div>
                                                            </Col>
                                                            <Col md={12} className="pb-3">
                                                                <Row style={{ borderBottom: '1px solid #000' }}>
                                                                    <Col md={4} className="text-center">
                                                                        <div className="border-right" style={{ borderColor: '#000', borderWidth: '1px' }}>
                                                                            <p className="rewarx-box-c-title">Your status</p>
                                                                            <p className="rewarx-box-c-sts"><span>{userdata.plan_name ? userdata.plan_name + ' TIER' : ''}</span></p>
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
                                                            <Col md={12} className="mt-4">
                                                                <div className="reward-box" style={{position: 'relative'}}>
                                                                    <span className="reward_star reward_star_grew">
                                                                        <img src={Silver} alt="" />
                                                                        <p className="reward_star_text">Silver TIER</p>
                                                                        </span>
                                                                    <span className="reward_star reward_star_gold"><img src={Gold} alt="" />
                                                                    <p className="reward_star_text">gold TIER</p>
                                                                    </span>
                                                                    <span className="reward_star reward_star_premeum"><img src={Prem} alt="" />
                                                                    <p className="reward_star_text">Platinum TIER</p>
                                                                    </span>
                                                                    <img src={RewardBg} style={{ height: '100%', width: '100%', objectFit: 'contain' }} alt="" />
                                                                </div>
                                                            </Col>
                                                        </>
                                                    )}
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