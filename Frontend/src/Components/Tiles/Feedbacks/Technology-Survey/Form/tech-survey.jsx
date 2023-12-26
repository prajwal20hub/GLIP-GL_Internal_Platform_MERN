import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../../Navbar/navbar";
import axios from "axios";
import { RadioGroup } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
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

import ValidateTechSurvey from "./validate-tech-survey";

const TechSurvey = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;
  
  const navigate = useNavigate();
  const { id } = useParams();
  // const currUser = useSelector((state) => state.currUser);

  const [techData, setTechData] = useState({
    //set in backend
    // empName: `${currUser.fname} ${currUser.lname}`,
    // user_id: '',     
    tech: '',
    cyber: '',
    cloud: '',
    commTool: ''
  })

  const { tech, cyber, cloud, commTool } = techData;

  const onInputChange = (e) => {
    setTechData({ ...techData, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const techDataError = ValidateTechSurvey(techData)

    if (techDataError !== null) {
      setError(techDataError);
      return;
    }
    else {
      setError(null);
      await axios.post(`${Base_URL}/api/tech-survey`, techData, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "You have sent Technology Survey Successfully.", "success");
          navigate(`/dashboard/feedback-home/${id}`);
        })
        .catch((err)=> {
          console.log(err)
        })
    }
  }

  const techQuestions = [
    {
      name: 'tech', value: tech,
      question: 'In which Technology are you interested ?',
      options: ['ReactJS', 'JAVA', 'DevOps', 'DotNet', 'AI/ML'],
    },
    {
      name: 'cyber', value: cyber,
      question: 'What type of Cyber-Security measures do you use ?',
      options: ['Anti-Virus', 'Firewall', 'VPN', '2FA', 'Others'],
    },
    {
      name: 'cloud', value: cloud,
      question: 'How frequently you use Cloud-Based services ?',
      options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
    },
    {
      name: 'commTool', value: commTool,
      question: 'Which communication tool you use the most for work-related discussion ?',
      options: ['Email', 'Microsoft Teams', 'Slack', 'Zoom', 'Others'],
    }
  ]

  return (
    <>
      <Navbar />
      <FormHeading>Technology Survey</FormHeading>
      <FeedFormBody>
        <FormContainer>
          {techQuestions.map((quest) => (
            <>
              <FormLabel>{quest.question}</FormLabel>
              <FormAstric>*</FormAstric> <br />
              <RadioGroup style={{ marginBottom: '1rem' }}
                row
                name={quest.name}
                value={quest.value}
                onChange={(e) => onInputChange(e)}
              >
                {quest.options.map((opt) => (
                  <FormControlLabel label={opt} value={opt}
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
              Submit
            </SubmitButton>
          </FlexDiv>
        </FormContainer>
      </FeedFormBody >
    </>
  );
};

export default TechSurvey;
