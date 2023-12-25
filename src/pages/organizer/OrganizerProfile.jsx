import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, isEmail, app_url } from '../../common/Helpers';
import Whitebtn from '../../component/Whitestarbtn';
import PhoneInput from 'react-phone-input-2';
import Nouserphoto from '../../common/image/nouser.png';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const [Loader, setLoader] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const organizerid = localStorage.getItem('organizerid')
    const [name, setname] = useState();
    const [fname, setfname] = useState();
    const [lname, setlname] = useState();
    const [email, setemail] = useState();
    const [message, setmessage] = useState();
    const [badge, setbadge] = useState();
    const [phone_number, setphone_number] = useState();
    const [whatsapp_number, setwhatsapp_number] = useState();
    const [address, setaddress] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [country, setcountry] = useState();
    const [pincode, setpincode] = useState();
    const [picture, setpicture] = useState();
    const [Bankaccount, setBankaccount] = useState();
    const [Bankname, setBankname] = useState();
    const [Holdername, setHoldername] = useState();
    const [Swift, setSwift] = useState();

    const [ufname, setufname] = useState();
    const [ulname, setulname] = useState();
    const [uemail, setuemail] = useState();
    const [uBankaccount, setuBankaccount] = useState();
    const [uConfirmBankaccount, setuConfirmBankaccount] = useState();
    const [uBankname, setuBankname] = useState();
    const [uHoldername, setuHoldername] = useState();
    const [uSwift, setuSwift] = useState();

    const [uwhatsapp_number, setuwhatsapp_number] = useState();
    const [uaddress, setuaddress] = useState();
    const [upincode, setupincode] = useState();
    const [userHobbies, setuserHobbies] = useState([]);

    const [password, setpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const fetchData = async () => {
        try {
            setApiLoader(true)
            const requestData = {
                id: organizerid,
            };
            fetch(apiurl + 'admin/get-organizer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setname(data.data.name);
                        setfname(data.data.first_name);
                        setlname(data.data.last_name);
                        setemail(data.data.email);
                        setufname(data.data.first_name);
                        setulname(data.data.last_name);
                        setuemail(data.data.email);
                        setphone_number(data.data.phone_number);
                        setBankaccount(data.data.bankaccount);
                        setBankname(data.data.bankname);
                        setHoldername(data.data.holdername);
                        setSwift(data.data.swiftcode);

                    }
                    setApiLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false)
                });
        } catch (error) {
            console.error('Api error:', error);
            setApiLoader(false)
        }
    }
    const Handelprofileupdate = async () => {
        try {
            if (!isEmail(uemail)) {
                return toast.error('Enter valid email address');
            }
            if (!ufname || !ulname || !uemail || !uBankaccount || !uBankname || !uConfirmBankaccount || !uHoldername || !uSwift) {
                return toast.error('Required field must not be empty');
            }
            if(uBankaccount == uConfirmBankaccount){

            }else{
                return toast.error('Account no and confirm account no not match');
            }
            setLoader(true);
            const requestData = {
                first_name: ufname,
                last_name: ulname,
                email: uemail,
                id: organizerid,
                bankaccount: uBankaccount,
                bankname: uBankname,
                holdername: uHoldername,
                swiftcode: uSwift,
            }
            fetch(apiurl + 'website/update-organizer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success(data.data);
                        setufname('');
                        setulname('');
                        setuemail('');
                        setLoader(false)
                        fetchData();
                    } else {
                        toast.error(data.message);
                    }

                })
                .catch(error => {
                    setLoader(false)
                    toast.error(error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false)
            toast.error(error.message);
            console.error('Api error:', error);
        }
    }
    const Handelchangepassword = async () => {
        try {
            if (!password || !confirmpassword) {
                return toast.error('Required field must not be empty');
            }
            if (password.length > 7) {

            } else {
                return toast.error('Password must be at least 8 characters long');
            }
            if (password === confirmpassword) {

            } else {
                return toast.error('Password and confirm password not match');
            }
            setLoader(true);
            const requestData = {
                password: password,
                id: organizerid,
            }
            fetch(apiurl + 'website/update-organizer-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                },
                body: JSON.stringify(requestData),
            })
                .then(response => response.json())
                .then(data => {
                    setLoader(false);
                    if (data.success == true) {
                        toast.success(data.data);
                        setpassword('');
                        setconfirmpassword('');
                        setLoader(false)
                    }
                })
                .catch(error => {
                    setLoader(false)
                    toast.error(error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            setLoader(false)
            console.error('Api error:', error);
        }
    }
    useEffect(() => {

        fetchData();
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="profile card card-body px-3 pt-3 pb-0">
                                <div className="profile-head">
                                    <div className="photo-content">
                                        <div className="cover-photo rounded"></div>
                                    </div>
                                    <div className="profile-info">
                                        <div className="profile-photo">
                                            <img src={picture ? picture : Nouserphoto} className="img-fluid rounded-circle" alt="" />
                                        </div>
                                        <div className="profile-details">

                                            {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '100px' }}> </div>) : (
                                                <>
                                                    <div className="profile-name px-3 pt-2">
                                                        <h4 className="text-primary mb-0">{name}</h4>
                                                        <p>{phone_number ? '+' + phone_number : 'No phone number'}</p>
                                                    </div>
                                                    <div className="profile-email px-2 pt-2">
                                                        <h4 className="text-muted mb-0">{email}</h4>
                                                        <p>Email</p>
                                                    </div>

                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="profile-tab">
                                                {ApiLoader ? (<div className="mt-5 mb-3 l-background w-100" style={{ height: '200px' }}> </div>) : (
                                                    <div className="custom-tab-1">
                                                        <ul className="nav nav-tabs">
                                                            <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link  active show">Personal Information</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#password-settings" data-bs-toggle="tab" className="nav-link">Change Password</a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content pt-5">
                                                            <div id="about-me" className="tab-pane fade active show">

                                                                <div className="profile-personal-info">

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Name <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Email <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{email}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Phone Number <span className="pull-end">:</span></h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{phone_number ? '+' + phone_number : 'No phone number'}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account no<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Bankaccount}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Bank name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Bankname}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Account holder name<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Holdername}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">SWIFT code<span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{Swift}</span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div id="profile-settings" className="tab-pane fade">
                                                                <div className="pt-3">
                                                                    <div className="settings-form">
                                                                        <h4 className="text-primary">Account Setting</h4>
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>First Name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="First Name" value={ufname} onChange={(e) => setufname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Last Name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Last Name" value={ulname} onChange={(e) => setulname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">

                                                                                    <div className="form-group">
                                                                                        <p>Email address <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Email Address" value={uemail} onChange={(e) => setuemail(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <h3>Bank Details</h3>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Account no <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Account no" value={uBankaccount} onChange={(e) => setuBankaccount(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Confirm Account no <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Confirm Account no" value={uConfirmBankaccount} onChange={(e) => setuConfirmBankaccount(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Bank name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Bank name" value={uBankname} onChange={(e) => setuBankname(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Account holder name <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Account holder name" value={uHoldername} onChange={(e) => setuHoldername(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>SWIFT code <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="SWIFT code" value={uSwift} onChange={(e) => setuSwift(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {Loader ? (
                                                                                <span>
                                                                                    <Whitebtn title={'Please wait...'} />
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={Handelprofileupdate}>
                                                                                    <Whitebtn title={'Update'} />
                                                                                </span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div id="password-settings" className="tab-pane fade">
                                                                <div className="pt-3">
                                                                    <div className="settings-form">
                                                                        <h4 className="text-primary">Change Password</h4>
                                                                        <form>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">

                                                                                        <p>Password <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="password" placeholder="Enter password" value={password} onChange={(e) => setpassword(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6"></div>
                                                                                <div className="col-md-6">

                                                                                    <div className="form-group">
                                                                                        <p>Confirm Password <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Enter confirm password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {Loader ? (
                                                                                <span>
                                                                                    <Whitebtn title={'Please wait...'} />
                                                                                </span>
                                                                            ) : (
                                                                                <span onClick={Handelchangepassword}>
                                                                                    <Whitebtn title={'Update password'} />
                                                                                </span>
                                                                            )}
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Dashboard;