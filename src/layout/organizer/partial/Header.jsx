import React from "react";
import WhitestarBtn from '../../../component/Whitestarbtn';
import Btn from '../../../component/BlueStarwhite';
import UserImg from '../../../common/image/Ellipse 73.png';
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
const Header = ({title}) => {
    return (
        <>
            <div className="header">
                <span className="user_type_btn user_type_btn_position">Organizer</span>
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <div class="dashboard_bar mt-4">
                                    {title}
                                </div>
                            </div>
                            <ul className="navbar-nav header-right" style={{marginTop: '50px'}}>
                                <li className="nav-item dropdown notification_dropdown">
                                    <Link className="button-join" to={'/'}>
                                        <Btn title={'Home'} />
                                    </Link>
                                </li>
                                <li class="nav-item dropdown header-profile">
                                <a class="nav-link new_user_menu_header" href="javascript:void(0);" role="button" data-bs-toggle="dropdown">
									<img src={UserImg} width="20" alt=""/>
                                    <span className="user_name">Alex Robert</span>
                                    <span className="user_drop_icon"><FiChevronDown /></span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a href="app-profile.html" class="dropdown-item ai-icon">
                                        <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" class="text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span class="ms-2">Profile </span>
                                    </a>
                                    <a href="email-inbox.html" class="dropdown-item ai-icon">
                                        <svg id="icon-inbox" xmlns="http://www.w3.org/2000/svg" class="text-success" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <span class="ms-2">Inbox </span>
                                    </a>
                                    <a href="page-login.html" class="dropdown-item ai-icon">
                                        <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        <span class="ms-2">Logout </span>
                                    </a>
                                </div>
                            </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;