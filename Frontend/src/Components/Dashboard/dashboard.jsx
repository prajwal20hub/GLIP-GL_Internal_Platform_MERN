import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/footer";
import NameInitials from "./name-initials";
import BackToTop from '../Home/back-to-top';
import {
    UserDetails,
    Quote,
    DashboardTiles,
    TileItem,
    DashboardMainDiv,
} from "./dashboard.styles";

const Dashboard = () => {
    const Base_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const [currUser, setCurrUser] = useState({});

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        await axios.get(`${Base_URL}/api/users/currentUser`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
            }
        })
            .then((res) => {
                setCurrUser(res.data)
                dispatch({
                    type: "CURRENT_USER",
                    payload: res.data
                })
                localStorage.setItem("currUser", JSON.stringify(res.data));

                const result = NameInitials(res.data.fname, res.data.lname);
                dispatch({
                    type: "NAME_INITIALS",
                    payload: result
                })
                localStorage.initials = result;
            })
            .catch((err) => {
                console.log(err.response.data.message)
                localStorage.clear();           //after 'expiresIn'_time, token expires
                window.location.href = '/'
            })
    }

    const { empID, fname, lname } = currUser;
    var tilesRow1 = [
        {
            label: "Access Privileges",
            link: currUser?.user_type === 'Admin' ?
                `/dashboard/access-privilege-admin/${id}` :
                `/dashboard/access-privilege-emp/${id}`,
        },
        {
            label: "Transport",
            link: currUser?.user_type === 'Transport Admin' ?
                `/dashboard/transport-manage-admin/${id}` :
                `/dashboard/transport-manage-emp/${id}`
        },
        {
            label: "Payslips",
            link: currUser?.user_type === 'Payroll Admin' ?
                `/dashboard/payslips-admin/${id}` :
                `/dashboard/payslips-emp/${id}`
        }
    ];
    var tilesRow2 = [
        {
            label: "Task Management",
            link: (currUser?.designation === 'Manager' || currUser?.user_type === 'Manager Admin') ?
                `/dashboard/task-manage-admin/${id}` :
                `/dashboard/task-manage-emp/${id}`
        },
        {
            label: "Leave Management",
            link: (currUser?.user_type === 'HR Admin' || currUser?.user_type === 'Manager Admin') ?
                `/dashboard/leave-manage-admin/${id}` :
                `/dashboard/leave-manage-emp/${id}`
        },
        {
            label: "Feedback",
            link: `/dashboard/feedback-home/${id}`
        }
    ];

    return (
        <>
            <Navbar />
            <DashboardMainDiv className="container-fluid ">
                <UserDetails
                    style={{ marginTop: "80px", marginLeft: "50px" }}>
                    <i>Hello {fname} {lname},</i>
                </UserDetails>
                <UserDetails style={{ marginLeft: "50px" }}>
                    <i>your Emp Id is: {empID}</i>
                </UserDetails>
                <div className="row" style={{ boxSizing: "border-box", marginLeft: "20px", marginTop: "75px" }}>
                    <Quote className="col-md-3 mb-4 mt-3 pt-4">
                        "All our dreams can come true if we have the courage
                        to pursue them." <br />- Walt Disney
                    </Quote>
                    <div className="col">
                        <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">
                            {tilesRow1.map((props) => (
                                <Link
                                    style={{ width: '10vw' }}
                                    to={props.link} >
                                    <TileItem className="dashboard-item1 col-lg-3 mb-2">
                                        {props.label}
                                    </TileItem>
                                </Link>
                            ))}
                        </DashboardTiles>

                        <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">

                            {tilesRow2.map((props) => (
                                <Link
                                    style={{ width: '10vw' }}
                                    to={props.link} >
                                    <TileItem className="dashboard-item4 col-lg-3 mb-2">
                                        {props.label}
                                    </TileItem>
                                </Link>
                            ))}
                        </DashboardTiles>
                    </div>
                </div>
            </DashboardMainDiv>
            <Footer />
            <BackToTop />
        </>
    );
};

export default Dashboard;