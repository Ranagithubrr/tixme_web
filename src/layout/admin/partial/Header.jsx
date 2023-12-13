import React from "react";
import WhitestarBtn from '../../../component/Whitestarbtn';
import { Link } from "react-router-dom";
import { app_url } from '../../../common/Helpers';
const Header = () => {
    return (
        <>
            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">

                            </div>
                            <ul className="navbar-nav header-right">
                                <li className="nav-item dropdown notification_dropdown">
                                    <Link to={app_url}>
                                        <WhitestarBtn title={'Website'} />
                                    </Link>
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