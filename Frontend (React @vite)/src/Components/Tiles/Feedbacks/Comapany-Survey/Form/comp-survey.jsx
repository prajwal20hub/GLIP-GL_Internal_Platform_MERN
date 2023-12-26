import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../../Navbar/navbar";
import ValidateCompSurvey from './validate-comp-survey'
// import { useSelector } from 'react-redux';

import {
    FormHeading,
    FeedFormBody,
    FormContainer,
    FormLabel,
    FormAstric,
    FlexDiv,
    SubmitButton,
    ErrorMessage,
} from "../../Feedback-Form/Form/feed-form.style";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Swal from "sweetalert2";

const CompSurvey = () => {
    const Base_URL = import.meta.env.VITE_BASE_URL;
  
    const navigate = useNavigate();
    var { id } = useParams();
    const [error, setError] = useState(null);
    // const currUser = useSelector((state) => state.currUser);

    const [compSurveyData, setcompSurveyData] = useState({
        //set in backend
        // empName: `${currUser.fname} ${currUser.lname}`,
        // user_id: "",                 
        empSatisfaction: "",
        trainingDev: "",
        empEngagement: "",
        empBenifits: "",
        empLeadership: "",
        empFuturePlanning: "",
        empWorkDiversity: "",
        empCommunication: "",
    });
    const { empSatisfaction, trainingDev, empEngagement, empBenifits, empLeadership, empFuturePlanning, empWorkDiversity, empCommunication } = compSurveyData;

    const onInputChange = (e) => {
        setcompSurveyData({ ...compSurveyData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const compSurveyValidate = ValidateCompSurvey(compSurveyData);
        if (compSurveyValidate !== null) {
            setError(compSurveyValidate);
            return;
        }
        else {
            setError(null);
            await axios.post(`${Base_URL}/api/company-survey`, compSurveyData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            })
                .then((res) => {
                    Swal.fire("Congrats", "You have sent Transport Request Successfully.", "success");
                    navigate(`/dashboard/feedback-home/${id}`);
                    return;
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const options = [
        { label: "Excellent", value: 5 },
        { label: "Very Good", value: 4 },
        { label: "Good", value: 3 },
        { label: "Average", value: 2 },
        { label: "Poor", value: 1 }
    ]

    const compQuestions = [
        {
            name: 'empSatisfaction', value: empSatisfaction,
            question: 'Employee Satisfaction',
        },
        {
            name: 'trainingDev', value: trainingDev,
            question: 'Training and Development',
        },
        {
            name: 'empEngagement', value: empEngagement,
            question: 'Employee Engagement and Satisfaction',
        },
        {
            name: 'empBenifits', value: empBenifits,
            question: 'Employee Benifits and Policies',
        },
        {
            name: 'empLeadership', value: empLeadership,
            question: 'Leadership and Management',
        },
        {
            name: 'empFuturePlanning', value: empFuturePlanning,
            question: 'Future Planning and Strategy',
        },
        {
            name: 'empWorkDiversity', value: empWorkDiversity,
            question: 'Workplace Diversity and Inclusion',
        },
        {
            name: 'empCommunication', value: empCommunication,
            question: 'Internal Communication and Collaboration',
        }
    ]

    return (
        <>
            <Navbar />
            <FormHeading> Company Survey </FormHeading>
            <FeedFormBody>
                <FormContainer >
                    <FormLabel>Rate the following Facilities You getting</FormLabel>
                    <br />
                    {compQuestions.map((quest) => (
                        <>
                            <FormLabel>{quest.question}</FormLabel>
                            <FormAstric>*</FormAstric> <br />
                            <RadioGroup style={{ marginBottom: '1rem' }}
                                row name={quest.name}
                                value={quest.value}
                                onChange={(e) => onInputChange(e)}
                            >
                                {options.map((opt) => (
                                    <FormControlLabel label={opt.label} value={opt.value}
                                        control={<Radio
                                            sx={{ '&, &.Mui-checked': { color: '#F37037' } }} />}
                                    />
                                ))}
                            </RadioGroup>
                        </>
                    ))}
                    <FlexDiv>
                        {error && <ErrorMessage>{error}</ErrorMessage>}
                    </FlexDiv>
                    <FlexDiv>
                        <SubmitButton onClick={e => onSubmit(e)}>
                            Make Request
                        </SubmitButton>
                    </FlexDiv>
                </FormContainer>
            </FeedFormBody>
        </>
    );
};

export default CompSurvey;