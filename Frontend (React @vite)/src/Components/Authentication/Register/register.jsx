import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationRegister from './validationRegister';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  FormBackground,
  FormLogo,
  FormContainer,
  // FormHeadDiv,
  FormHeading,
  FormLabel,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  LinksDiv,
  SpanText,
  FormLinks
} from './forms.style';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Register = () => {
  const navigate = useNavigate();
  const [totalRegistered, setTotalRegistered] = useState();

  const [user, setUser] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    workLocation: '',
    address: '',
    designation: '',
    password: '',
    confirmPass: '',
    empID: '',
    //user_type set default to 'employee' in Schema
  })
  const { fname, mname, lname, email, phone, dob, address, workLocation, designation, password, confirmPass, empID } = user;

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get('/api/total-registrations')
      .then((res) => {
        setTotalRegistered(res.data.total_registrations + 1);
        setUser({ ...user, "empID": res.data.total_registrations + 1001 })
      })
  }

  var arrUserKeys = Object.keys(user);
  const genderRef = useRef(null);
  const desRef = useRef(null);
  const workRef = useRef(null);

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });   //arrays of objects

    for (let i = 0; i < n; i++) {
      if (Object.values(user)[i] === '' && i !== 1) {
        if (arrUserKeys[i] === 'gender') {
          genderRef.current.style.color = "red";
        }
        else if (arrUserKeys[i] === 'desigation') {
          desRef.current.style.color = "red";
        }
        else if (arrUserKeys[i] === 'workLocation') {
          workRef.current.style.color = "red";
        }
        else {
          (document.getElementsByName(arrUserKeys[i]))[0].style.color = "red";
          (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "2px solid red";
        }
      }
    }

    if (e.target.value === '' && e.target.name !== 'mname') {
      e.target.style.borderBottom = "2px solid red";
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = "red";
    }
    else {
      if (e.target.name === 'designation' || e.target.name === 'workLocation') {
        (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
      }
      else {
        e.target.style.borderBottom = null;
        (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
      }
    }
  }

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();       //PREVENT REFRESH OF PAGE

    // const postObj = user;   //[Do not use this] shallow copy (concurrent changes)

    const postObj = { ...user };        //deep copy (avoid concurrent changes)  
    delete (postObj.confirmPass);       //we dont require this in backend

    const registerError = validationRegister(user);             //validation
    if (registerError !== null) {
      setError(registerError);
      return;
    }
    else {
      setError(null);
      await axios.post('/api/users/register', postObj)
        .then(() => {
          setError(null);
          axios.post("/api/leaves-remain", {       //we require this in leave-management-emp
            "empID": empID,
            "empName": `${fname} ${lname}`,
            //other fields set default in schema so no need to post them
          })
            .then(() => {
              axios.put("/api/total-registrations", {
                total_registrations: totalRegistered,      //update +1
              })
            });
          Swal.fire("Congrats", "You have Successfully Registered.", "success");
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message, "error");
          setError(err.response.data.message)
        })
    }
  }

  //password hide & show
  const [show, setShow] = useState(false);
  const changeVisibility = (e) => {
    e.preventDefault();
    setShow(current => !current);
  }

  //confirm password hide & show
  const [showCP, setShowCP] = useState(false);
  const changeVisibilityCP = (e) => {
    e.preventDefault();
    setShowCP(current => !current);
  }

  const formProp = [
    {
      label: 'First Name',
      name: 'fname',
      placeholder: 'Enter your First Name',
      value: fname
    },
    {
      label: 'Middle Name',
      name: 'mname',
      placeholder: 'Enter your Middle Name',
      value: mname
    },
    {
      label: 'Last Name',
      name: 'lname',
      placeholder: 'Enter your Last Name',
      value: lname
    },
    {
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your Email',
      value: email
    },
    {
      label: 'Phone',
      name: 'phone',
      placeholder: 'Enter your Phone Number',
      value: phone
    },
    {
      label: 'Gender',
      name: 'gender',
      options: ['Male', 'Female'],
      ref: genderRef
    },
    {
      label: 'Date of Birth',
      name: 'dob',
      placeholder: 'MM/YYYY',
      value: dob
    },
    {
      label: 'Work Location',
      name: 'workLocation',
      value: workLocation,
      options: ['Nagpur', 'Pune', 'Hyderabad', 'Noida', 'Bangalore', 'Chennai'],
      ref: workRef
    },
    {
      label: 'Address',
      name: 'address',
      placeholder: 'Enter your Current Address',
      value: address
    },
    {
      label: 'Designation',
      name: 'designation',
      value: designation,
      options: ['Intern', 'Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer', 'Manager', 'HR', 'Transport', 'Payroll'],
      ref: desRef
    }
  ];

  const formPass = [
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your Password',
      value: password,
      showStatus: show,
      visibilityFunc: changeVisibility
    },
    {
      name: 'confirmPass',
      label: 'Confirm Password',
      placeholder: 'Enter your Confirm Password',
      value: confirmPass,
      showStatus: showCP,
      visibilityFunc: changeVisibilityCP
    }
  ]

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
      </Link>

      <FormContainer>
        <FormHeading> Registration </FormHeading>
        {formProp.map((obj, index) => {
          if (obj.name === 'gender') {
            return (
              <>
                <FormLabel {...obj}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric> <br />
                <RadioGroup style={{ marginBottom: '0.9rem' }}
                  row
                  name={obj.name}
                  onChange={(e) => onInputChange(e, index)}
                >
                  {obj.options.map((opt) => (
                    <FormControlLabel
                      label={opt} value={opt}
                      control={<Radio
                        sx={{
                          '&, &.Mui-checked': {
                            color: '#6D6E71'
                          }
                        }}
                      />} />
                  ))}
                </RadioGroup>
              </>
            )
          }
          if (obj.name === 'designation' || obj.name === 'workLocation') {
            return (
              <>
                <FormLabel name={obj.name} ref={obj.ref}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric> <br />
                <Select
                  style={{ width: '97%', marginBottom: '1.1rem' }}
                  name={obj.name}
                  value={obj.value}
                  onChange={(e) => onInputChange(e, index)}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      border: '0.15vw solid #6D6E71',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#F37037',
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "#F37037",
                    }
                  }}
                >
                  {obj.options.map((opt) => (
                    <MenuItem value={opt}  >
                      {opt}
                    </MenuItem>
                  ))}
                </Select >
              </>
            )
          }

          return (
            <>
              <FormLabel name={obj.name}>{obj.label}</FormLabel>
              {obj.name !== 'mname' && <FormAstric>*</FormAstric>}
              <FormInput type="text" {...obj}
                onChange={(e) => onInputChange(e, index)} />
            </>
          )
        }
        )}

        {formPass.map((obj, ind) => (
          <>
            <FormLabel name={obj.name}>{obj.label}  </FormLabel><FormAstric>*</FormAstric>
            <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
              onChange={(e) => onInputChange(e, ind + 10)}
            />
            {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> :
              <VisibilityIcon onClick={obj.visibilityFunc} />}
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Register</SubmitButton>
        </FlexDiv>

        <LinksDiv>
          <SpanText> Already Registered? </SpanText>
          <Link style={{ textDecoration: 'none' }}
            to="/login">
            <FormLinks> Login </FormLinks>
          </Link>
        </LinksDiv>
      </FormContainer>
    </FormBackground >

  );
}

export default Register;