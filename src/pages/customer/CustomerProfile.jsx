import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { apiurl, admin_url, isEmail, app_url } from '../../common/Helpers';
import Whitebtn from '../../component/Whitestarbtn';
import PhoneInput from 'react-phone-input-2';
import Nouserphoto from '../../common/image/nouser.png';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Dashboard = ({ title }) => {
    const navigate = useNavigate();
    const Beartoken = localStorage.getItem('userauth');
    const [Loader, setLoader] = useState(false);
    const [ApiLoader, setApiLoader] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState([]);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim() !== '' && tags.length < 10) {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        }
    };
    const handleDeleteTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const [name, setname] = useState();
    const [fname, setfname] = useState();
    const [lname, setlname] = useState();
    const [email, setemail] = useState();
    const [badge, setbadge] = useState();
    const [phone_number, setphone_number] = useState();
    const [whatsapp_number, setwhatsapp_number] = useState();
    const [address, setaddress] = useState();
    const [city, setcity] = useState();
    const [state, setstate] = useState();
    const [country, setcountry] = useState();
    const [pincode, setpincode] = useState();
    const [picture, setpicture] = useState();

    const [ufname, setufname] = useState();
    const [ulname, setulname] = useState();
    const [uemail, setuemail] = useState();
    const [uwhatsapp_number, setuwhatsapp_number] = useState();
    const [uaddress, setuaddress] = useState();
    const [upincode, setupincode] = useState();
    const [userHobbies, setuserHobbies] = useState([]);

    const [password, setpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();

    const [Hobby, setHobby] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const Handelprofileupdate = async () => {
        try {
            if (!isEmail(uemail)) {
                return toast.error('Enter valid email address');
            }
            if (!ufname || !ulname || !uemail || !uaddress || !upincode) {
                return toast.error('Required field must not be empty');
            }
            setLoader(true);
            const requestData = {
                first_name: ufname,
                last_name: ulname,
                email: uemail,
                whatsapp_no: uwhatsapp_number,
                address: uaddress,
                pincode: upincode,
                hobbies: selectedHobbies
            }
            fetch(apiurl + 'website/update-user-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
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
                        setuwhatsapp_number('');
                        setuaddress('');
                        setupincode('');
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
            console.error('Login api error:', error);
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
                password: password
            }
            fetch(apiurl + 'website/update-user-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                    'Authorization': `Bearer ${Beartoken}`, // Set the Content-Type header to JSON
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
            console.error('Login api error:', error);
        }
    }
    const fetchData = async () => {
        try {
            setApiLoader(true)
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
                        setname(data.data.name);
                        setfname(data.data.first_name);
                        setlname(data.data.last_name);
                        setemail(data.data.email);
                        setphone_number(data.data.phone_number);
                        setwhatsapp_number(data.data.whatsapp_no);
                        setaddress(data.data.address);
                        setcity(data.data.city);
                        setstate(data.data.state);
                        setcountry(data.data.country);
                        setpincode(data.data.pincode);
                        setpicture(data.data.picture);
                        setbadge(data.data.plan_name);

                        setufname(data.data.first_name);
                        setulname(data.data.last_name);
                        setuemail(data.data.email);
                        setuwhatsapp_number(data.data.whatsapp_no);
                        setuaddress(data.data.address);
                        setupincode(data.data.pincode);
                        setSelectedHobbies(data.data.hobbies)
                    }
                    setApiLoader(false)
                })
                .catch(error => {
                    console.error('Insert error:', error);
                    setApiLoader(false)
                });
        } catch (error) {
            console.error('Login api error:', error);
            setApiLoader(false)
        }
    }
    const fetchHobby = async () => {
        try {
            fetch(apiurl + 'website/hobby/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set the Content-Type header to JSON
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success == true) {
                        setHobby(data.data)
                    }
                })
                .catch(error => {
                    setLoader(false);
                    // toast.error('Insert error: ' + error.message);
                    console.error('Insert error:', error);
                });
        } catch (error) {
            console.error(error.message);
        }
    }
    const toggleHobby = (id) => {
        const updatedHobbies = [...selectedHobbies];
    
        if (updatedHobbies.includes(id)) {
            // Hobby is already selected, remove it
            const index = updatedHobbies.indexOf(id);
            updatedHobbies.splice(index, 1);
        } else {
            // Hobby is not selected, add it
            updatedHobbies.push(id);
        }

        setSelectedHobbies(updatedHobbies);
    };
    useEffect(() => {
        if (!Beartoken) {
            toast.error("Login to your account");
            navigate(app_url + 'auth/customer/signup');
            return;
        }
        fetchData();
        fetchHobby();
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
                                                    {badge ? (
                                                        <>
                                                            <div className="profile-email px-2 pt-2">
                                                                <span class="badge badge-pill badge-warning">{badge}</span>
                                                                <p>My badge</p>
                                                            </div>
                                                        </>
                                                    ) : ''}
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
                                                            <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link  active show">About Me</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
                                                            </li>
                                                            <li className="nav-item"><a href="#password-settings" data-bs-toggle="tab" className="nav-link">Change Password</a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content">
                                                            <div id="about-me" className="tab-pane fade active show">
                                                                <div className="profile-skills mb-5 mt-3">
                                                                    <h4 className="text-primary mb-2">Interested</h4>
                                                                    <p className="btn btn-primary light btn-xs mb-1">No data found</p>
                                                                    {/* <a href="#" className="btn btn-primary light btn-xs mb-1">Admin</a>
                                                                <a href="#" className="btn btn-primary light btn-xs mb-1">Dashboard</a>
                                                                <a href="#" className="btn btn-primary light btn-xs mb-1">Photoshop</a>
                                                                <a href="#" className="btn btn-primary light btn-xs mb-1">Bootstrap</a>
                                                                <a href="#" className="btn btn-primary light btn-xs mb-1">Responsive</a>
                                                                <a href="#" className="btn btn-primary light btn-xs mb-1">Crypto</a> */}
                                                                </div>
                                                                <div className="profile-personal-info">
                                                                    <h4 className="text-primary mb-4">Personal Information</h4>
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
                                                                            <h5 className="f-w-500">Whatsapp no <span className="pull-end">:</span>
                                                                            </h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{whatsapp_number ? '+ ' + whatsapp_number : 'Not found'}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-sm-3 col-5">
                                                                            <h5 className="f-w-500">Location <span className="pull-end">:</span></h5>
                                                                        </div>
                                                                        <div className="col-sm-9 col-7"><span>{address}, {country ? 'City - ' + city + ',' : ''}  {country ? 'Country - ' + country + ',' : ''} Pincode - {pincode}</span>
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
                                                                                <div className="col-md-6">

                                                                                    <div className="form-group">
                                                                                        <p>WhatsApp no</p>
                                                                                        <input className="form-control" type="number" placeholder="WhatsApp no" value={uwhatsapp_number} onChange={(e) => setuwhatsapp_number(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">

                                                                                    <div className="form-group">
                                                                                        <p>Address <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Address" value={uaddress} onChange={(e) => setuaddress(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <p>Pincode <span className="text-danger">*</span></p>
                                                                                        <input className="form-control" type="text" placeholder="Pincode" value={upincode} onChange={(e) => setupincode(e.target.value)}></input>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12 pb-3">
                                                                                    <div className="form-group">
                                                                                        <p>Hobbies</p>
                                                                                        {Hobby.map((item, index) => (
                                                                                            <span
                                                                                                key={item.name}
                                                                                                className={`hobby-box ${selectedHobbies.includes(item.name) || userHobbies.includes(item.name) ? 'hobby-active' : ''}`}
                                                                                                onClick={() => toggleHobby(item.name)}
                                                                                            >
                                                                                                {item.name}
                                                                                            </span>
                                                                                        ))}
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