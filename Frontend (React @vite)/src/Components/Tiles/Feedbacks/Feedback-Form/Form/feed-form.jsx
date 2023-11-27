import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import Navbar from '../../../../Navbar/navbar'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';

import {
  FeedFormBody,
  FormContainer,
  FormHeading,
  FormLabel,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
} from './feed-form.style.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ValidateFeedForm from './validate-feed-form';

const FeedForm = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selects, setSelects] = useState([]);
  const currUser = useSelector((state) => state.currUser);

  const [feedData, setFeedData] = useState({
    // empName: '',          //sets in backend
    // user_id: '',
    empDept: '',
    empFeedName: '',
    rating: ''
  })
  const { empDept, empFeedName, rating } = feedData;

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get(`/api/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onInputChange = (e) => {
    setFeedData({ ...feedData, [e.target.name]: e.target.value })
  }

  const Devs = ['Intern', 'Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer'];

  const adminTypes = ['Admin', 'HR Admin', 'Manager Admin', 'Payroll Admin', 'Transport Admin'];
  var state;

  const currName = `${currUser.fname} ${currUser.lname}`;   //current user name

  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      const feedDataError = ValidateFeedForm(feedData);
      if (feedDataError !== null) {
        setError(feedDataError);
      }
      else {
        setError(null);
        axios.post("/api/feedback", feedData, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`
          }
        })
        Swal.fire("Congrats", "You have sent Feedback Successfully.", "success");
        onCancel();
        navigate(`/dashboard/feedback-form/${id}`);
      }
    }
    else{
      Swal.fire("Oops!", error, "error");
    }
  }

  var isFeed;

  useEffect(() => {
    setError(null);
    setFeedData({ ...feedData, 'rating': '', 'empFeedName': '' })      //reset values on change of Team
    setSelects([]);                   //incase change emp_type (prevent addon)
    if (empDept === 'Developer') {        //sorting all developers in selection
      users.forEach((obj) => {
        const tempName = `${obj.fname} ${obj.lname}`;
        isFeed = false;
        Devs.forEach((dev) => {    //as developer's user_type never be admin (its always employee)
          if (obj.designation === dev && currName !== tempName) {  //so no need to check wheater admin type or not       //curr user name will not come
            const newObj = {
              label: `${obj.fname} ${obj.lname}`,
              value: `${obj.fname} ${obj.lname}`
            }
            setSelects(selects => [...selects, newObj]);
            return;               //break and got to users.map (for next iteration)
          }
        });
      });
    }
    else if (empDept === 'Admin') {                  //sorting all admins in selection
      users.forEach((obj) => {
        const tempName = `${obj.fname} ${obj.lname}`;
        adminTypes.forEach((admin) => {
          if (obj.user_type === admin && currName !== tempName) { //curr user name will not come
            const newObj = {
              label: `${obj.fname} ${obj.lname}`,
              value: `${obj.fname} ${obj.lname}`
            }
            setSelects(selects => [...selects, newObj])
            return;          //break and got to users.map (for next iteration)
          }
        })
      })
    }
    else {                 //for all empType excepr devs & admins
      if (empDept) {
        users.forEach((obj) => {
          const tempName = `${obj.fname} ${obj.lname}`;
          state = true;
          if (obj.designation === empDept && currName !== tempName) { //curr user name will not come
            adminTypes.forEach((admin) => {
              if (obj.user_type === admin) {
                state = false;
                return;
              }
            })
            if (state === true) {
              const newObj = {
                label: `${obj.fname} ${obj.lname}`,
                value: `${obj.fname} ${obj.lname}`
              }
              setSelects(selects => [...selects, newObj])
              return;          //break and got to users.map (for next iteration)
            }
          }
        })
      }
    }
  }, [empDept]);

  useEffect(() => {
    if (empFeedName) {
      axios.get(`/api/feedback/empfeed/${empFeedName}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then((res) => {
          setError(null);
        })
        .catch((err) => {
          isFeed = true
          setError(err.response.data.message)          //feedback already given
        })
    }
  }, [empFeedName])

  const empDeptOpts = ['Admin', 'Developer', 'Manager', 'HR', 'Payroll', 'Transport']

  const onCancel = () => {
    setFeedData({
      ...feedData,
      empDept: '',
      empFeedName: '',
      rating: ''
    })
  };

  return (
    <>
      <Navbar />
      <FormHeading> Feedback Form </FormHeading>
      <FeedFormBody>
        <FormContainer>
          <FormLabel>Please select Team whome you wanted to give feedback</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup style={{ marginBottom: '1rem' }}
            row name="empDept"
            value={empDept}
            onChange={(e) => { onInputChange(e) }}
          >
            {empDeptOpts.map((dept) => (
              <FormControlLabel label={dept} value={dept}
                control={<Radio
                  sx={{ '&, &.Mui-checked': { color: '#F37037' } }} />}
              />
            ))}
          </RadioGroup>

          <FormLabel> Please Select the name of the employee from above selected Team </FormLabel>
          <FormAstric>*</FormAstric> <br />
          <Select
            value={empFeedName}
            style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
            name='empFeedName' onChange={(e) => onInputChange(e)}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '0.1rem solid #6D6E71',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#F37037',
              },
              '.MuiSvgIcon-root ': {
                fill: "#F37037",
              }
            }}
          >
            {selects.map((prop) => (
              <MenuItem {...prop} >
                {prop.label}
              </MenuItem>
            ))}
          </Select>
          <br /><br />

          <FormLabel> Please give the Rating </FormLabel>
          <FormAstric>*</FormAstric> <br />
          <Box sx={{ width: '100%' }} >
            <Slider
              sx={{
                '& .MuiSlider-thumb': {
                  color: "#F37037"
                },
                '& .MuiSlider-track': {
                  color: "#F37037"
                },
                '& .MuiSlider-rail': {
                  color: "#acc4e4"
                }
              }}
              defaultValue={0}
              value={rating}
              // getAriaValueText={valuetext}
              // onChange={(_, newVal) => {setFeedData({...feedData, 'rating': newVal})}}
              onChangeCommitted={(_, newVal) => {
                setFeedData({ ...feedData, 'rating': newVal })
              }}
              valueLabelDisplay="auto"      //display value
              step={10}
              marks
              min={0}
              max={100}
            // disabled
            />
          </Box>

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
  )
}
export default FeedForm