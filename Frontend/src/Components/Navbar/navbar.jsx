import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GLlogo from '../../Utils/Images/GL-logo.jpg';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '@mui/icons-material/Logout';

import {
    NavContainer,
    NavButton,
    NavButtonDiv,
    NavLogo,
    NavHeadingDiv,
    NavHeading,
    //------------------//
    IconButton,
    SettingDiv,
    Text,
    NavLinkSpan
} from './navbar.style'

const Navbar = () => {
    const isloggedin = useSelector(state => state.isloggedin);
    var currUser = useSelector((state) => state.currUser);
    var initials = useSelector((state) => state.initials);  //Login icon Initials(Firstname and lastname)

    const [dashLink, setDashLink] = useState(true);

    useEffect(() => {
        let pathName = window.location.pathname;          // '/dashboard/user_id' --> '/' count is 2
        let count = pathName.split('/').length - 1;
        (pathName.includes('dashboard') && count === 2 && 
            setDashLink(false)
        )
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const windowRef = useRef();

    const handleIconClick = (e) => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (windowRef.current && !windowRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const loggedOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <NavContainer>
            <NavHeadingDiv>
                <NavLink to="/" style={{ textDecoration: 'none', display: 'flex' }}>
                    <NavLogo src={GLlogo}></NavLogo>
                    <NavHeading>GLIP</NavHeading>
                </NavLink>
            </NavHeadingDiv>
            <NavButtonDiv>
                {isloggedin ?
                    <>
                        <IconButton
                            onClick={(e) => handleIconClick(e)}>
                            {initials}
                        </IconButton>

                        {isOpen && (
                            <SettingDiv ref={windowRef} className="window">
                                <div className="card">
                                    <div
                                        className="card-body"
                                        style={{ borderRadius: "50%", height: "80%" }}>
                                        <Text
                                            className="card-title" >
                                            <b>{currUser.fname} {currUser.lname}</b>
                                        </Text>
                                        <Text
                                            className="card-title"
                                            style={{ fontSize: "0.8rem" }}>
                                            {currUser.email}
                                        </Text>
                                        <Text
                                            className="card-title"
                                            style={{ fontSize: "0.9rem" }}>
                                            Emp ID: {currUser.empID}
                                        </Text>

                                        {dashLink ?
                                            <NavLink
                                                to={`/dashboard/${currUser.id}`}
                                                style={{ textDecoration: "none", color: "#000" }}>
                                                <Text
                                                    className="card-title"
                                                    style={{ fontSize: "0.9rem", paddingTop: '10px' }}>
                                                    Go to Dashboard
                                                </Text>
                                            </NavLink> :
                                            <hr />
                                        }
                                        <NavLink
                                            to={`/resetpassword/${currUser.id}`}
                                            style={{ textDecoration: "none", color: "#000" }}>
                                            <NavLinkSpan>
                                                <SettingsRoundedIcon />
                                                <span
                                                    className="span mx-2"
                                                    style={{ fontSize: "0.95rem" }}>
                                                    Manage Your Account
                                                </span>
                                            </NavLinkSpan>
                                        </NavLink>
                                        <hr />
                                        <p className="card-text" >
                                            <NavLink
                                                to="#"
                                                style={{ textDecoration: "none", color: "#000" }}>
                                                <NavLinkSpan>
                                                    <LogoutIcon
                                                        onClick={loggedOut}
                                                        style={{ marginLeft: "45%" }} />
                                                </NavLinkSpan>
                                            </NavLink>
                                        </p>
                                    </div>
                                </div>
                            </SettingDiv>
                        )}

                    </>
                    :
                    <>
                        <NavLink to="/login">
                            <NavButton>Login</NavButton>
                        </NavLink>

                        <NavLink to="/register">
                            <NavButton>Register</NavButton>
                        </NavLink>


                    </>}
            </NavButtonDiv>
        </NavContainer>

    )
}

export default Navbar