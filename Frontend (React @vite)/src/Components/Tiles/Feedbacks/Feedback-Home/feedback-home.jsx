import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../Navbar/navbar'
import Footer from '../../../Footer/footer'
import {
    FeedbackHomeDiv,
    DashboardTiles,
    TileItem,
    DashboardMainDiv,
    FooterDiv
} from './feedback-home.style'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const FeedbackHome = () => {
    const { id } = useParams();
    const currUser = useSelector((state) => state.currUser);

    const [compSurStat, setCompSurStat] = useState(false);
    const [techSurStat, setTechSurStat] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
//from token_validation middleware's decoded data we get user's id in backend so no need to send user's id in url
        await axios.get(`/api/company-survey/user_id`, {            
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            .then((res) => {
                setCompSurStat(true);
            })

//-----------------------------------------------------------------------------
        await axios.get(`/api/tech-survey/user_id`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            .then((res) => {
                setTechSurStat(true);
            })
    }

    const { user_type } = currUser;
    var tilesRow1 = [
        {
            label: "Feedback",
            link: (user_type === 'HR Admin') ?
                `/dashboard/feedback-chart/${id}` :
                `/dashboard/feedback-form/${id}`

        },
        {
            label: "Company Survey",
            link: (user_type === 'HR Admin') ?
                `/dashboard/company-survey-chart/${id}` :
                (!compSurStat ? `/dashboard/company-survey/${id}` :
                    `/dashboard/already-filled/${id}`
                )
        },
        {
            label: "Technology Survey",
            link: (user_type === 'HR Admin') ?
                `/dashboard/tech-survey-chart/${id}` :
                (!techSurStat ? `/dashboard/tech-survey/${id}` :
                    `/dashboard/already-filled/${id}`
                )
        }
    ];

    return (
        <FeedbackHomeDiv>
            <Navbar />
            <DashboardMainDiv>
                <div className="col">
                    <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">
                        {tilesRow1.map((props) => (
                            <Link
                                style={{ maxWidth: '10vw' }}
                                to={props.link} >
                                <TileItem className="dashboard-item1 col-lg-3 mb-2">
                                    {props.label}
                                </TileItem>
                            </Link>
                        ))}
                    </DashboardTiles>
                </div>
            </DashboardMainDiv>
            <FooterDiv>
                <Footer />
            </FooterDiv>
        </FeedbackHomeDiv>
    )
}

export default FeedbackHome