import React from "react";
import WhitestarBtn from '../../../component/Whitestarbtn';
import { Link } from "react-router-dom";
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
                                    <Link className="button-join" to={'/'}>
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